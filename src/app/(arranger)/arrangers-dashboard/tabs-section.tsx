import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UploadSheetForm from "./_forms/upload-sheet-form";
import { Library, Music, PlusIcon, StickyNote } from "lucide-react";
import { type UserData } from "@/types/user-data";
import { useState } from "react";
import SheetBar from "@/components/sheet/sheet-bar";
import ListViewer from "@/components/list-viewer";

export default function TabsSection({ userData }: { userData: UserData }) {
  const [newType, setNewType] = useState<string>("sheet");

  return (
    <Tabs defaultValue="sheets" className="w-full flex flex-col">
      <TabsList className="w-full justify-start h-fit p-0">
        <ScrollArea className="flex-1">
          <div className="w-full flex overflow-x-auto overflow-y-visible truncate p-1 space-x-1">
            <TabsTrigger value="new">
              New <PlusIcon className="ml-1" />
            </TabsTrigger>
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
            <TabsTrigger
              className="p-0 flex-1 max-w-[300px] sm:max-w-full  min-w-[200px]"
              value="search"
            >
              <Input placeholder="Search" className="w-full" />
            </TabsTrigger>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </TabsList>
      <TabsContent value="new">
        <div className="border rounded-md p-1 flex flex-col gap-1">
          <Select onValueChange={(value) => setNewType(value)} value={newType}>
            <SelectTrigger className="border-none shadow-none bg-muted">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sheet">
                <div className="flex flex-row items-center text-xs">
                  <Music size={16} className="mr-1 text-xl" />
                  Sheet
                </div>
              </SelectItem>
              <SelectItem value="package">
                <div className="flex flex-row items-center text-xs">
                  <Library size={16} className="mr-1 text-xl" />
                  Package
                </div>
              </SelectItem>
              <SelectItem value="post">
                <div className="flex flex-row items-center text-xs">
                  <StickyNote size={16} className="mr-1 text-xl" />
                  Post
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          {newType === "sheet" && <UploadSheetForm arranger={userData.id} />}
        </div>
      </TabsContent>
      <TabsContent value="sheets">
        <ListViewer length={userData.sheets.length}>
          {userData.sheets.map((sheet) => {
            return (
              <SheetBar
                sheet={{
                  ...sheet,
                  arranger: userData.id,
                  users: {
                    id: userData.id,
                    arranger_metadata: userData.arranger_metadata,
                  },
                }}
                key={sheet.id}
              />
            );
          })}
        </ListViewer>
      </TabsContent>
      <TabsContent value="packages">Packages</TabsContent>
      <TabsContent value="reviews">Reviews</TabsContent>
      <TabsContent value="posts">Posts</TabsContent>
      <TabsContent value="search">Search anything</TabsContent>
    </Tabs>
  );
}
