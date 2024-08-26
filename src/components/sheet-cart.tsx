import { FiShoppingCart } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Database } from "../../database.types";
import SheetThumbnail from "./SheetThumbnail";

export default function SheetCard({
  sheet,
}: {
  sheet: Database["public"]["Tables"]["sheets"]["Row"];
}) {
  return (
    <Card className="shadow-none overflow-hidden bg-muted">
      <CardContent className="flex  items-center justify-center bg-foreground  max-w-[420px] overflow-hidden p-0">
        <SheetThumbnail url={sheet.sheet_url} />
      </CardContent>
      <CardFooter className="flex flex-col gap-2 mt-4 items-start">
        <div className="grid grid-cols-[16px,1fr] gap-2">
          <Avatar className="size-4">
            <AvatarImage src="favicon.ico" alt="arranger" />
            <AvatarFallback className="font-gloock">MQ</AvatarFallback>
          </Avatar>
          <p className="truncate my-auto text-xs text-muted-foreground">
            {sheet.users.name}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">{sheet.title}</p>
          <p className="text-muted-foreground text-xs mt-2">
            {sheet.original_artist}
          </p>
          <p className="font-gloock font-black text-4xl ">$5</p>
        </div>
        <div className="flex gap-4 w-full">
          <Button className="flex-1 ">Buy</Button>
          <Button size={"icon"} variant={"outline"}>
            <FiShoppingCart />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
