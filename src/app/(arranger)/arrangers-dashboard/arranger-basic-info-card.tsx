"use client";
import { Button } from "@/components/ui/button";
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
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
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
          <div className="flex flex-col justify-center gap-4 items-center mx-auto">
            <Link
              href={"/arranger/" + userData.success.arranger_metadata[0].id}
            >
              <div className="relative rounded-full size-32">
                <Image
                  placeholder="blur"
                  blurDataURL="/favicon.ico"
                  quality={100}
                  priority
                  src={
                    userData.success?.arranger_metadata[0]?.avatar_url ??
                    "/favicon.ico"
                  }
                  fill
                  alt={
                    userData.success?.arranger_metadata[0]?.display_name ??
                    "User PFP"
                  }
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
                <Button size={"icon"} variant={"secondary"} className="size-6">
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
            <div className="flex gap-4">
              <div className="text-center">
                <p className="font-semibold text-lg">
                  {userData.success?.arranger_metadata[0]?.display_name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {userData.success?.arranger_metadata[0]?.description}
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
        <Tabs defaultValue="sheets" className="mx-auto  w-full flex flex-col">
          <TabsList className="w-full justify-start h-fit p-0">
            <div className="ml-1">
              <Button>
                Create <PlusIcon className="ml-1" />
              </Button>
            </div>
            <ScrollArea>
              <div className="flex-1 overflow-x-auto overflow-y-visible truncate p-1 space-x-1">
                <TabsTrigger value="sheets" className="h-9">
                  Sheets
                </TabsTrigger>
                <TabsTrigger value="packages" className="h-9">
                  Packages
                </TabsTrigger>
                <TabsTrigger value="reviews" className="h-9">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="posts" className="h-9">
                  Posts
                </TabsTrigger>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="py-1 pr-1 flex-1 ">
              <TabsTrigger
                value="search"
                className="w-full min-w-[100px] p-0 self-stretch"
              >
                <Input placeholder="Search" />
              </TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="sheets">Sheets</TabsContent>
          <TabsContent value="packages">Packages</TabsContent>
          <TabsContent value="reviews">Reviews</TabsContent>
          <TabsContent value="posts">Posts</TabsContent>
          <TabsContent value="search">Search anything</TabsContent>
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
