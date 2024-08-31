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
import getUser from "@/actions/getuser";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import UpdateForm from "./update-form";
import { Badge } from "@/components/ui/badge";
import { MdLibraryBooks, MdMusicNote, MdPeople, MdStars } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ArrangerBasicInfoCard() {
  const { toast } = useToast();
  const [openForm, setOpenForm] = useState(false);
  const [changes, setChanges] = useState({
    name: false,
    avatar: false,
    description: false,
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [showDialogWarning, setShowDialogWarning] = useState(false);
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
  });

  if (userLoading) return;
  if (userData?.success)
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-4 items-center mx-auto">
            <div className="relative rounded-full size-24">
              <Image
                src={
                  userData.success?.arranger_metadata[0]?.avatar_url ??
                  "/favicon.ico"
                }
                fill
                alt={
                  userData.success?.arranger_metadata[0]?.display_name ??
                  "User PFP"
                }
                className="rounded-full object-cover object-top"
              />
            </div>
            <div>
              <p className="font-semibold text-lg">
                {userData.success?.arranger_metadata[0]?.display_name}
              </p>
              <p className="text-muted-foreground text-sm">
                {userData.success?.arranger_metadata[0]?.description}
              </p>
            </div>
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
                <Button className="" size={"icon"} variant={"outline"}>
                  <Pencil1Icon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-80 p-4">
                <DialogHeader>
                  <DialogTitle>Update Arranger&apos;s Info</DialogTitle>
                </DialogHeader>
                <UpdateForm
                  userData={userData.success}
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
          </div>
          <div className="flex gap-2 flex-row mx-auto">
            <Badge>
              99 Followers{" "}
              <MdPeople size={16} className="ml-1 text-yellow-400" />
            </Badge>
            <Badge>
              109 Sheets{" "}
              <MdMusicNote size={16} className="ml-1 text-yellow-400" />
            </Badge>
            <Badge>
              2 Packages{" "}
              <MdLibraryBooks size={16} className="ml-1 text-yellow-400" />
            </Badge>
            <Badge>
              988 Stars <MdStars size={16} className="ml-1 text-yellow-400" />
            </Badge>
          </div>
        </div>
        <Tabs defaultValue="sheets" className="mx-auto  w-full flex flex-col">
          <TabsList className="mx-auto">
            <TabsTrigger value="sheets">Sheets</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="sheets">Sheets</TabsContent>
          <TabsContent value="packages">Packages</TabsContent>
          <TabsContent value="reviews">Reviews</TabsContent>
        </Tabs>
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
