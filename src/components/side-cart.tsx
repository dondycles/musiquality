import { FiShoppingCart } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { useCartStore } from "../../store";
import SheetThumbnail from "./sheet-thumbnail";
import BrandedText from "./branded-text";
import CurrencyText from "./currency-text";
import { Trash, X } from "lucide-react";

export default function SideCart() {
  const cart = useCartStore();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative" variant={"outline"} size={"icon"}>
          <FiShoppingCart />
          {cart.cart.length !== 0 ? (
            <div className="absolute -top-2 -right-3 text-red-500 font-black rounded-full bg-background size-6 border">
              <p>{cart.cart.length}</p>
            </div>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FiShoppingCart />
            <p>Your cart</p>
          </SheetTitle>
          <SheetDescription>
            There are currently {cart.cart.length} sheets on your cart
          </SheetDescription>
        </SheetHeader>
        <div className="flex-col flex gap-4 mt-4">
          {cart.cart.map((sheet) => {
            return (
              <div
                key={sheet.id}
                className="flex flex-row gap-1 bg-muted rounded-md"
              >
                <SheetThumbnail
                  className="shrink-0 w-16 sm-w-20 rounded-md border overflow-hidden"
                  existingThumbnailUrl={sheet.thumbnail_url}
                />
                <div className="flex flex-col p-1 flex-1">
                  <BrandedText
                    className="text-base sm:text-base md:text-lg line-clamp-1"
                    text={sheet.title}
                  />
                  <p className="text-muted-foreground text-xs  line-clamp-1">
                    {sheet.users?.arranger_metadata[0].display_name}
                  </p>
                  <CurrencyText
                    className="mt-auto mb-0 text-xl sm:text-2xl md:text-2xl "
                    amount={sheet.price}
                  />
                </div>
                <Button
                  onClick={() => cart.removeToCart(sheet)}
                  className="shrink-0 my-auto mr-1"
                  size={"icon"}
                  variant={"ghost"}
                >
                  <X className="size-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
