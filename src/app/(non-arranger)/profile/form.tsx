import updateUser from "@/actions/update-user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import UserAvatar from "@/components/user-avatar";
import { UserData, userDataSchema } from "@/types/user-data";
import { UploadButton } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ProfileForm({
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
  };
  setChanges: (state: { name: boolean; avatar: boolean }) => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const updateUserForm = useForm<z.infer<typeof userDataSchema>>({
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      avatar_url: userData.avatar_url ?? "/favicon.ico",
      name: userData.name ?? "",
    },
  });

  const handleUpdate = async (data: z.infer<typeof userDataSchema>) => {
    if (imageUploading)
      return toast({
        title: "Error!",
        description: "Image is still uploading!",
        variant: "destructive",
        duration: 3000,
      });
    const { error } = await updateUser(data, userData.id);
    if (error) return updateUserForm.setError("name", { message: error });
    toast({
      title: "Success!",
      description: "successfully updated!",
      duration: 3000,
    });
    queryClient.invalidateQueries({ queryKey: ["user", userData.id] });
    closeForm();
  };

  useEffect(() => {
    if (updateUserForm.watch("name") !== userData.name) {
      setChanges({ ...changes, name: true });
    } else {
      setChanges({ ...changes, name: false });
    }
  }, [updateUserForm.watch("name"), userData.name]);

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
            <FormItem className="flex-1 flex flex-col items-center gap-4 w-fit mx-auto relative aspect-square">
              <UserAvatar
                className="rounded-md size-32"
                url={field.value}
                user={userData.id}
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
          name="name"
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
