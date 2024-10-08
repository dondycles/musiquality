import { createClient } from "@/utils/supabase/server";
import { Uploader } from "@uploadthing/react";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const supabase = createClient();
      const user = (await supabase.auth.getUser()).data.user;
      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for userId:", metadata.userId);

      // console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
  sheet: f({
    pdf: {
      maxFileCount: 1,
      maxFileSize: "1024KB",
    },
  })
    .middleware(async () => {
      // This code runs on your server before upload
      const supabase = createClient();
      const id = (await supabase.auth.getUser()).data.user?.id;
      if (!id) throw new UploadThingError("Unauthorized");
      const user = await supabase
        .from("arranger_metadata")
        .select("id")
        .eq("user_id", id)
        .single();
      if (!user.data?.id) throw new UploadThingError("You are not an arranger");
      // If you throw, the user will not be able to upload

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.data?.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedByArranger: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
