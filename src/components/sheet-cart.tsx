import { FiShoppingCart } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Database } from "../../database.types";
import SheetThumbnail from "./SheetThumbnail";
import Link from "next/link";

export default function SheetCard({
  sheet,
}: {
  sheet: Database["public"]["Tables"]["sheets"]["Row"];
}) {
  return (
    <Card className="shadow-none overflow-hidden bg-muted w-screen max-w-[244px]">
      <Link href={"/sheet/" + sheet.id}>
        <CardContent className="flex items-center justify-center overflow-hidden p-0">
          <SheetThumbnail url={sheet.sheet_url} />
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col gap-2 mt-4 items-start">
        <div className="grid grid-cols-[16px,1fr] gap-2">
          <Avatar className="size-4">
            <AvatarImage src="favicon.ico" alt="arranger" />
            <AvatarFallback className="font-gloock">MQ</AvatarFallback>
          </Avatar>
          <Link
            href={"/arranger/" + sheet.users.id}
            className="truncate my-auto text-xs text-muted-foreground"
          >
            {sheet.users.name}
          </Link>
        </div>
        <div className="flex flex-col">
          <Link href={"/sheet/" + sheet.id} className="font-semibold">
            {sheet.title}
          </Link>
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
