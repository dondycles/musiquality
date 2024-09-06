import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function ArrangerBar() {
  return (
    <div className="bg-muted rounded-md col-span-1 row-span-1 p-2 flex items-center gap-2">
      <Avatar className="size-12">
        <AvatarImage src="favicon.ico" alt="arranger" />
        <AvatarFallback className="font-gloock">MQ</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <p className="truncate font-semibold text-sm">John Rod Dondoyano </p>
        <div className="flex gap-1 truncate">
          <Badge variant={"outline"} className="w-fit">
            243 Sheets
          </Badge>
          <Badge variant={"outline"} className="w-fit">
            243 Followers
          </Badge>
        </div>
      </div>
      <Button variant={"ghost"} size={"icon"} className="ml-auto mr-0">
        <Heart size={16} />
      </Button>
    </div>
  );
}
