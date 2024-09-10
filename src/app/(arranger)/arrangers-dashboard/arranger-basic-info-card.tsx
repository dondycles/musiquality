"use client";
import { Button } from "@/components/ui/button";
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
import { UserData } from "@/types/user-data";
import { Pencil } from "lucide-react";
import ArrangerBadges from "@/components/arranger/badges";
import ArrangerAvatar from "@/components/arranger/avatar";

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
          <ArrangerAvatar
            arranger={userData.arranger_metadata?.id ?? ""}
            className="size-32 rounded-md"
            url={userData.arranger_metadata?.avatar_url}
          />
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
                <Pencil size={16} />
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
                {userData.arranger_metadata?.display_name}
              </p>
              <p className="text-muted-foreground text-sm">
                {userData.arranger_metadata?.description}
              </p>
            </div>
          </div>
        </div>
        <ArrangerBadges
          className="flex-wrap mx-auto"
          followers={123}
          sheets={userData.arranger_metadata?.sheets.length}
        />
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
