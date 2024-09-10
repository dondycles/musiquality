import uploadSheet from "@/actions/upload-sheet";
import SheetThumbnail from "@/components/sheet/sheet-thumbnail";
import SheetViewer from "@/components/sheet/sheet-viewer";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiple-selector";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { instrumentsSchema } from "@/types/instruments";
import { originialArtistSchema } from "@/types/original-artist";

import { UploadButton } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader, Plus } from "lucide-react";
import CurrencyInput from "@/components/ui/currency-input";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { ToastAction } from "@/components/ui/toast";
import { Separator } from "@/components/ui/separator";
import { useQueryClient } from "@tanstack/react-query";

export const uploadSheetSchema = z.object({
  title: z.string(),
  original_artist: originialArtistSchema,
  sheet_url: z.string().url(),
  thumbnail_url: z.string().url(),
  instrument: instrumentsSchema,
  with_chords: z.boolean(),
  with_lyrics: z.boolean(),
  difficulty: z.string(),
  arranger: z.string().uuid(),
  price: z.coerce.number(),
});

export default function UploadSheetForm({ arranger }: { arranger: string }) {
  const queryClient = useQueryClient();
  const uploadSheetForm = useForm<z.infer<typeof uploadSheetSchema>>({
    resolver: zodResolver(uploadSheetSchema),
    defaultValues: {
      original_artist: [],
      sheet_url: "",
      title: "",
      thumbnail_url: "",
      arranger: arranger,
      difficulty: "",
      instrument: [],
      with_chords: false,
      with_lyrics: false,
      price: 3,
    },
  });
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [originalArtistInput, setOriginalArtistInput] = useState<{
    [key: number]: string;
  }>({});
  const [usedInstruments, setUsedInstruments] = useState<string[]>([]);

  const { toast } = useToast();

  const _uploadSheet = async (data: z.infer<typeof uploadSheetSchema>) => {
    if (uploadingPdf)
      return toast({
        title: "Error",
        description: "Please wait until the uploading of PDF is done",
        variant: "destructive",
        duration: 3000,
      });
    const { error, success } = await uploadSheet(data);
    if (error)
      return toast({
        title: "Error",
        description: error,
        variant: "destructive",
        duration: 3000,
      });
    toast({
      title: "Success",
      duration: 3000,
      description: "Sheet successfully uploaded",
      action: (
        <Link href={"/sheet/" + success} target="_blank">
          <ToastAction altText="Visit">View Sheet</ToastAction>
        </Link>
      ),
    });
    setOriginalArtistInput([""]);
    setUsedInstruments([]);
    uploadSheetForm.setValue("original_artist", [""]);
    uploadSheetForm.setValue("instrument", []);
    uploadSheetForm.reset();
    queryClient.invalidateQueries({
      queryKey: ["user", arranger],
    });
  };

  useEffect(() => {
    if (uploadSheetForm.formState.isSubmitting) return;
    uploadSheetForm.setValue(
      "original_artist",
      Object.values(originalArtistInput)
    );
    uploadSheetForm.setValue("instrument", usedInstruments);
  }, [originalArtistInput, uploadSheetForm, usedInstruments]);

  return (
    <Form {...uploadSheetForm}>
      <form
        onSubmit={uploadSheetForm.handleSubmit(_uploadSheet)}
        className="flex flex-col gap-1"
      >
        <div className="flex flex-col sm:flex-row gap-1 flex-1">
          <FormField
            control={uploadSheetForm.control}
            name="sheet_url"
            render={({ field }) => (
              <FormItem className="self-stretch  flex items-center justify-center flex-col">
                <>
                  {field.value ? (
                    <Dialog>
                      <DialogTrigger className="flex-1 h-full">
                        <div className="flex flex-col gap-1 flex-1  h-full">
                          <SheetThumbnail
                            className="border rounded-md overflow-hidden flex-1"
                            _setThumbnailUrl={(url) => {
                              uploadSheetForm.setValue("thumbnail_url", url);
                            }}
                            pdfUrl={field.value}
                          />
                          <Button
                            type="button"
                            className="mb-0 mt-auto"
                            onClick={() =>
                              uploadSheetForm.resetField("sheet_url")
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="p-4">
                        <DialogHeader>
                          <DialogTitle>Sheet Review</DialogTitle>
                          <SheetViewer url={field.value} key={field.value} />
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <UploadButton
                      content={{
                        button({ ready, isUploading }) {
                          if (ready) return <Plus size={16} />;
                          if (isUploading)
                            return (
                              <Loader size={16} className="animate-spin" />
                            );
                        },
                      }}
                      className="ut-button:bg-foreground ut-button:text-background ut-label:text-background flex rounded-md justify-normal p-2 mx-auto ut-button:size-9 "
                      endpoint="sheet"
                      onClientUploadComplete={(data) => {
                        uploadSheetForm.setValue("sheet_url", data[0].url);
                        setUploadingPdf(false);
                      }}
                      onUploadBegin={() => setUploadingPdf(true)}
                      onUploadError={() => setUploadingPdf(false)}
                      onUploadAborted={() => setUploadingPdf(false)}
                    />
                  )}
                </>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator orientation="vertical" className="h-full" />
          <div className="flex flex-col gap-1 flex-1">
            {/* Title */}
            <FormField
              control={uploadSheetForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* og artists */}
            <FormField
              control={uploadSheetForm.control}
              name="original_artist"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <>
                      {Array.from(
                        {
                          length: Object.values(originalArtistInput).length + 1,
                        },
                        (_, index) => {
                          return (
                            <Input
                              onInput={(e) => {
                                setOriginalArtistInput((prev) => ({
                                  ...prev,
                                  [index]: e?.currentTarget?.value,
                                }));

                                if (e?.currentTarget?.value === "") {
                                  setOriginalArtistInput(
                                    Object.values(
                                      originalArtistInput
                                    ).toSpliced(index, 1)
                                  );
                                }
                              }}
                              value={field.value[index]}
                              key={`artist-${index + 1}`}
                              placeholder={`Original Artist ${index + 1}`}
                            />
                          );
                        }
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* difficulty */}
            <FormField
              control={uploadSheetForm.control}
              name="difficulty"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* instruments */}
            <FormField
              control={uploadSheetForm.control}
              name="instrument"
              render={() => (
                <FormItem className="w-full space-y-0">
                  <MultiSelector
                    onValuesChange={setUsedInstruments}
                    values={usedInstruments}
                    loop
                    className="m-0 p-0  space-y-0"
                  >
                    <MultiSelectorTrigger className="border px-3 rounded-md h-9">
                      <MultiSelectorInput
                        className="text-sm p-0 m-0 w-fit flex-1"
                        placeholder="Instruments"
                      />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList className="p-1 mt-1">
                        <MultiSelectorItem value={"piano"}>
                          Piano
                        </MultiSelectorItem>
                        <MultiSelectorItem value={"violin"}>
                          Violin
                        </MultiSelectorItem>
                        <MultiSelectorItem value={"guitar"}>
                          Guitar
                        </MultiSelectorItem>
                        <MultiSelectorItem value={"bass"}>
                          Bass
                        </MultiSelectorItem>
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-2 border rounded-md p-1 h-9 items-center justify-center shadow-sm">
              <FormField
                control={uploadSheetForm.control}
                name="with_chords"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-1 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Chords</FormLabel>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={uploadSheetForm.control}
                name="with_lyrics"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-1 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Lyrics</FormLabel>
                    </FormItem>
                  );
                }}
              />
            </div>
            <CurrencyInput form={uploadSheetForm} name="price" />
            {/* <FormField control={uploadSheetForm.control} name="with_lyrics" /> */}
            <Button
              className="mb-0 mt-auto"
              disabled={uploadSheetForm.formState.isSubmitting || uploadingPdf}
            >
              Upload
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
