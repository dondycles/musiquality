import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";
import { useEffect } from "react";
import { arrangersMetadataSchema } from "@/types/arrangers-metadata";
import { type UserData } from "@/types/user-data";
import updateArranger from "@/actions/update-arranger";
import { Plus } from "lucide-react";
export default function UpdateForm({
  userData,
  closeForm,
  setImageUploading,
  imageUploading,
  changes,
  setChanges,
}: {
  userData: UserData;
  closeForm: () => void;
  setImageUploading: (state: boolean) => void;
  imageUploading: boolean;
  changes: {
    name: boolean;
    avatar: boolean;
    description: boolean;
  };
  setChanges: (state: {
    name: boolean;
    avatar: boolean;
    description: boolean;
  }) => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const updateUserForm = useForm<z.infer<typeof arrangersMetadataSchema>>({
    resolver: zodResolver(arrangersMetadataSchema),
    defaultValues: {
      display_name: userData?.arranger_metadata?.display_name,
      avatar_url: userData?.arranger_metadata?.avatar_url ?? "/favicon.ico",
      description: userData?.arranger_metadata?.description!,
    },
  });
  const handleUpdate = async (
    data: z.infer<typeof arrangersMetadataSchema>
  ) => {
    if (imageUploading)
      return toast({
        title: "Error!",
        description: "Image is still uploading!",
        variant: "destructive",
        duration: 3000,
      });
    const { error } = await updateArranger(data, userData.id);
    if (error)
      return updateUserForm.setError("display_name", { message: error });
    toast({
      title: "Success!",
      description: "successfully updated!",
      duration: 3000,
    });
    queryClient.invalidateQueries({ queryKey: ["user", userData.id] });
    closeForm();
  };
  useEffect(() => {
    if (
      updateUserForm.watch("display_name") !==
      userData.arranger_metadata?.display_name
    ) {
      setChanges({ ...changes, name: true });
    } else {
      setChanges({ ...changes, name: false });
    }
    if (
      updateUserForm.watch("description") !==
      userData.arranger_metadata?.description
    ) {
      setChanges({ ...changes, description: true });
    } else {
      setChanges({ ...changes, description: false });
    }
  }, [
    updateUserForm.watch("display_name"),
    userData.arranger_metadata?.display_name,
    updateUserForm.watch("description"),
    userData.arranger_metadata?.description,
  ]);
  return (
    <Form {...updateUserForm}>
      <form
        onSubmit={updateUserForm.handleSubmit(handleUpdate)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={updateUserForm.control}
          name="avatar_url"
          render={({ field }) => (
            <FormItem className="flex-1 flex flex-col items-center gap-4 w-full relative aspect-square">
              <Image
                placeholder="blur"
                blurDataURL="/favicon.ico"
                quality={100}
                src={field.value ?? "/favicon.ico"}
                width={256}
                height={256}
                alt={userData.arranger_metadata?.avatar_url ?? "User PFP"}
                className="rounded-md border object-cover object-center"
                sizes="144px"
              />
              <UploadButton
                content={{
                  button() {
                    return <Plus size={16} />;
                  },
                }}
                endpoint="imageUploader"
                className=" ut-button:bg-foreground/50 ut-button:size-12  ut-button:text-background absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ut-label:text-background ut-allowed-content:text-background"
                onUploadBegin={() => {
                  setImageUploading(true);
                  setChanges({ ...changes, avatar: true });
                }}
                onClientUploadComplete={(data) => {
                  setImageUploading(false);
                  setChanges({ ...changes, avatar: true });
                  updateUserForm.setValue("avatar_url", data[0].url);
                }}
                onUploadError={(e) => {
                  toast({
                    title: e.name,
                    description: e.message,
                    variant: "destructive",
                    duration: 3000,
                  });
                  setImageUploading(false);
                  setChanges({ ...changes, avatar: false });
                }}
                onUploadAborted={() => {
                  setChanges({ ...changes, avatar: false });
                  setImageUploading(false);
                }}
                onBeforeUploadBegin={(files) => {
                  setImageUploading(true);
                  return files;
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateUserForm.control}
          name="display_name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder={userData.arranger_metadata?.display_name}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateUserForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Input
                placeholder={
                  !userData.arranger_metadata?.description
                    ? "Short description about you"
                    : userData.arranger_metadata?.description
                }
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={imageUploading || updateUserForm.formState.isSubmitting}
          className="disabled"
        >
          Update
        </Button>
      </form>
    </Form>
  );
}
