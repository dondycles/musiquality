"use client";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import UpdateForm from "./_forms/update-form";
import { Badge } from "@/components/ui/badge";
import { MdLibraryBooks, MdMusicNote, MdPeople, MdStars } from "react-icons/md";
import Link from "next/link";
import { UserData } from "@/types/user-data";

export default function ArrangerBasicInfoCard({
  userData,
}: {
  userData: UserData;
}) {
  const { toast } = useToast();
  const [openForm, setOpenForm] = useState(false);
  const [changes, setChanges] = useState({
    name: false,
    avatar: false,
    description: false,
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [showDialogWarning, setShowDialogWarning] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col justify-center gap-4 items-center mx-auto">
          <Link href={"/arranger/" + userData.arranger_metadata[0].id}>
            <div className="relative rounded-full size-32">
              <Image
                placeholder="blur"
                blurDataURL="/favicon.ico"
                quality={100}
                priority
                src={
                  userData.arranger_metadata[0]?.avatar_url ?? "/favicon.ico"
                }
                fill
                alt={userData.arranger_metadata[0]?.display_name ?? "User PFP"}
                className="rounded-md object-cover object-top "
              />
            </div>
          </Link>
          <Dialog
            key={"updateForm"}
            open={openForm}
            onOpenChange={(state) => {
              if (imageUploading)
                return toast({
                  title: "Error!",
                  description: "Image is still uploading!",
                  variant: "destructive",
                });
              if (changes.avatar || changes.name || changes.description)
                return setShowDialogWarning(true);
              setOpenForm(state);
            }}
          >
            <DialogTrigger asChild>
              <Button size={"icon"} variant={"outline"}>
                <Pencil1Icon />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-80 p-4">
              <DialogHeader>
                <DialogTitle>Update Arranger&apos;s Info</DialogTitle>
              </DialogHeader>
              <UpdateForm
                userData={userData}
                closeForm={() => {
                  setOpenForm(false);
                  setChanges({
                    avatar: false,
                    name: false,
                    description: false,
                  });
                }}
                imageUploading={imageUploading}
                setImageUploading={(state) => setImageUploading(state)}
                changes={changes}
                setChanges={(state) => setChanges(state)}
              />
            </DialogContent>
          </Dialog>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="font-semibold text-lg">
                {userData.arranger_metadata[0]?.display_name}
              </p>
              <p className="text-muted-foreground text-sm">
                {userData.arranger_metadata[0]?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-center items-center">
          <Badge>
            <span className="line-clamp-1">99 Followers</span>
            <MdPeople size={16} className="ml-1 text-yellow-400" />
          </Badge>
          <Badge>
            <span className="line-clamp-1">109 Sheets</span>
            <MdMusicNote size={16} className="ml-1 text-yellow-400" />
          </Badge>
          <Badge>
            <span className="line-clamp-1">2 Packages</span>
            <MdLibraryBooks size={16} className="ml-1 text-yellow-400" />
          </Badge>
          <Badge>
            <span className="line-clamp-1">988 Stars</span>
            <MdStars size={16} className="ml-1 text-yellow-400" />
          </Badge>
        </div>
      </div>
      {/* warning dialog */}
      <Dialog
        key={"warningDialog"}
        open={showDialogWarning}
        onOpenChange={setShowDialogWarning}
      >
        <DialogContent className="w-80 p-4">
          <DialogHeader>
            <DialogTitle>Discard changes?</DialogTitle>
            <DialogDescription>
              Changes are not saved. Discard it?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 ">
            <Button
              variant={"destructive"}
              className="flex-1"
              onClick={() => {
                setShowDialogWarning(false);
                setChanges({
                  avatar: false,
                  name: false,
                  description: false,
                });
                setOpenForm(false);
              }}
            >
              Discard
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                setShowDialogWarning(false);
              }}
            >
              Back
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
