"use client";

import { useToast } from "@/components/ui/use-toast";
import UserAvatar from "@/components/user-avatar";
import { UserDataContext } from "@/components/user-data-provider";
import { useContext, useState } from "react";
import ProfileForm from "./form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import ArrangerBar from "@/components/arranger/bar";

export default function ProfileMain() {
  const { isLoading, userData } = useContext(UserDataContext);
  const { toast } = useToast();
  const [openForm, setOpenForm] = useState(false);
  const [changes, setChanges] = useState({
    name: false,
    avatar: false,
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [showDialogWarning, setShowDialogWarning] = useState(false);
  if (isLoading) return;
  if (userData)
    return (
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col justify-center gap-4 items-center mx-auto">
          <UserAvatar
            user={userData.id ?? ""}
            className="size-32 rounded-md"
            url={userData.avatar_url}
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
              if (changes.avatar || changes.name)
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
                <DialogTitle>Update User&apos;s Info</DialogTitle>
              </DialogHeader>
              <ProfileForm
                userData={userData}
                closeForm={() => {
                  setOpenForm(false);
                  setChanges({
                    avatar: false,
                    name: false,
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
              <p className="font-semibold text-lg">{userData.name}</p>
              <p className="text-muted-foreground text-sm">{userData.email}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <p className="text-sm text-muted-foreground w-full">
            Followed Artists
          </p>
          {userData.arranger_followers.map((ar) => {
            if (ar.arranger_metadata)
              return (
                <ArrangerBar
                  key={ar.id}
                  arranger={ar.arranger_metadata}
                  current_user={userData}
                />
              );
          })}
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
