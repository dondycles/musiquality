"use client";
import { FiShoppingCart } from "react-icons/fi";
import {
  Sheet,
  SheetClose,
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
import { CheckCircle, X } from "lucide-react";
import PaymentForm from "./payment-form";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "@/utils/stripe";
import { UserData } from "@/types/user-data";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { MdPayment } from "react-icons/md";
import Link from "next/link";
import { Progress } from "./ui/progress";
import { useQueryClient } from "@tanstack/react-query";
const stripe = getStripe();
export default function SideCart({
  user,
}: {
  user: UserData | null | undefined;
}) {
  var _ = require("lodash");
  const queryClient = useQueryClient();
  const cart = useCartStore();
  const total = cart.cart.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  const [cartState, setCartState] = useState<
    "cart" | "checkout" | "success" | "error"
  >("cart");
  return (
    <Sheet onOpenChange={() => setCartState("cart")}>
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
      <SheetContent side={"bottom"} className="flex flex-col h-[75dvh] ">
        <SheetHeader className="max-w-[500px] w-screen mx-auto p-4">
          {cartState !== "cart" && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Button
                  className="rounded-full"
                  size={"icon"}
                  onClick={() => setCartState("cart")}
                >
                  <FiShoppingCart />
                </Button>
                <Button
                  className="rounded-full"
                  size={"icon"}
                  onClick={() => setCartState("checkout")}
                >
                  <MdPayment className="size-5" />
                </Button>
                <Button className="rounded-full" size={"icon"}>
                  <CheckCircle />
                </Button>
              </div>
              <Progress
                value={
                  (cartState === "checkout" && 50) ||
                  (cartState === "success" && 100) ||
                  0
                }
                className="duration-1000"
              />
            </div>
          )}
          {cartState === "cart" && (
            <>
              <SheetTitle className="flex items-center gap-2">
                <FiShoppingCart />
                <p>Your cart</p>
              </SheetTitle>
              <SheetDescription>
                There are currently {cart.cart.length} sheets on your cart
              </SheetDescription>
            </>
          )}
          {cartState === "checkout" && (
            <>
              <SheetTitle className="flex items-center gap-2">
                <MdPayment />
                <p>Payment</p>
              </SheetTitle>
              <SheetDescription>
                Please fill your details to proceed
              </SheetDescription>
            </>
          )}
        </SheetHeader>
        <div className="flex flex-col overflow-y-auto overflow-x-hidden gap-3 h-full max-w-[500px] w-screen mx-auto  p-4">
          {cartState === "cart" && (
            <>
              <ScrollArea>
                <div className="flex-col flex gap-4 overflow-auto">
                  {cart.cart.map((sheet) => {
                    return (
                      <div
                        key={sheet.id}
                        className="flex flex-row gap-1 bg-muted rounded-md"
                      >
                        <SheetThumbnail
                          className="shrink-0 w-24 sm-w-20 rounded-md border overflow-hidden"
                          existingThumbnailUrl={sheet.thumbnail_url}
                        />
                        <div className="flex flex-col p-1 flex-1">
                          <BrandedText
                            className="text-base sm:text-base md:text-lg line-clamp-1"
                            text={sheet.title}
                          />
                          <p className="text-muted-foreground text-xs  line-clamp-1">
                            {sheet.users?.arranger_metadata?.display_name}
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
              </ScrollArea>
              <div className="mb-0 mt-auto flex flex-col gap-4 ">
                <div>
                  <p className="text-muted-foreground text-sm"> Total price:</p>{" "}
                  <CurrencyText amount={total} />
                </div>
                <Button
                  disabled={total === 0}
                  className="disabled:opacity-50 disabled:pointer-events-none"
                  onClick={() => setCartState("checkout")}
                >
                  Check out
                </Button>
              </div>
            </>
          )}
          {cartState === "checkout" && (
            <>
              <Elements
                stripe={stripe}
                options={{
                  mode: "payment",
                  currency: "usd",
                  appearance: {
                    theme: "flat",
                    labels: "floating",
                  },
                  amount: total * 100,
                  fonts: [
                    {
                      cssSrc:
                        "'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'",
                      family: "Poppins",
                    },
                  ],
                }}
              >
                <PaymentForm
                  total={total}
                  sheets={cart.cart.map((sheet) => ({
                    id: sheet.id,
                    price: sheet.price,
                  }))}
                  user={user}
                  onSuccess={() => {
                    cart.resetCart();
                    queryClient.invalidateQueries({
                      queryKey: ["user", user?.id],
                    });
                    setCartState("success");
                  }}
                />
              </Elements>
              <Button onClick={() => setCartState("cart")}>Back to cart</Button>
            </>
          )}
          {cartState === "success" && (
            <div className="flex flex-col gap-4 items-center justify-center flex-1">
              <CheckCircle className="size-12 mx-auto" />
              <p>Thank you for purchasing!</p>

              <Link href={"/library"}>
                <SheetClose>
                  <Button onClick={() => setCartState("cart")}>
                    View Library
                  </Button>
                </SheetClose>
              </Link>
              <Button onClick={() => setCartState("cart")}>Back to cart</Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
