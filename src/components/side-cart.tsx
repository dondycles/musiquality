"use client";
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
import SheetThumbnail from "./sheet/sheet-thumbnail";
import BrandedText from "./branded-text";
import CurrencyText from "./currency-text";
import { CheckCircle, CreditCard, ShoppingCart, X } from "lucide-react";
import PaymentForm from "./payment-form";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "@/utils/stripe";
import { UserData } from "@/types/user-data";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { Progress } from "./ui/progress";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
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
        <Button className="relative p-0" variant={"outline"} size={"icon"}>
          <motion.div
            layout
            key={`items-${cart.cart.length}`}
            initial={{ scale: 0.75 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.75 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <ShoppingCart size={16} />
            {cart.cart.length !== 0 ? (
              <div className="absolute -top-2 -right-3 text-red-500 font-black rounded-full bg-background size-6 border">
                <p>{cart.cart.length}</p>
              </div>
            ) : null}
          </motion.div>
        </Button>
      </SheetTrigger>
      <SheetContent side={"bottom"} className="">
        <div className="flex flex-col max-w-[500px] mx-auto h-[75dvh]">
          <SheetHeader className="p-4">
            {cartState !== "cart" && (
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                exit={{ x: 50 }}
                className="flex flex-col gap-2"
              >
                <div className="flex justify-between">
                  <Button
                    className="rounded-full"
                    size={"icon"}
                    onClick={() => setCartState("cart")}
                  >
                    <ShoppingCart size={16} />
                  </Button>
                  <Button
                    className="rounded-full"
                    size={"icon"}
                    onClick={() => setCartState("checkout")}
                  >
                    <CreditCard size={16} className="size-5" />
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
              </motion.div>
            )}
            {cartState === "cart" && (
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                exit={{ x: 50 }}
              >
                <SheetTitle className="flex items-center gap-2">
                  <ShoppingCart size={16} />
                  <p>Your cart</p>
                </SheetTitle>
                <SheetDescription>
                  There are currently {cart.cart.length} sheets on your cart
                </SheetDescription>
              </motion.div>
            )}
            {cartState === "checkout" && (
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                exit={{ x: 50 }}
              >
                <SheetTitle className="flex items-center gap-2">
                  <CreditCard size={16} />
                  <p>Payment</p>
                </SheetTitle>
                <SheetDescription>
                  Please fill your details to proceed
                </SheetDescription>
              </motion.div>
            )}
          </SheetHeader>
          <div className="overflow-y-auto overflow-x-hidden flex p-4 flex-1">
            {cartState === "cart" && (
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                exit={{ x: 50 }}
                key={"cart"}
                className="flex flex-col flex-1 gap-3"
              >
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
                              {sheet.arranger_metadata?.display_name}
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
                    <p className="text-muted-foreground text-sm">
                      {" "}
                      Total price:
                    </p>{" "}
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
              </motion.div>
            )}
            {cartState === "checkout" && (
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                exit={{ x: 50 }}
                key={"checkout"}
                className="flex flex-col flex-1 gap-3"
              >
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
                <Button onClick={() => setCartState("cart")}>
                  Back to cart
                </Button>
              </motion.div>
            )}
            {cartState === "success" && (
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                exit={{ x: 50 }}
                key={"success"}
                className="flex flex-col gap-4 items-center justify-center flex-1"
              >
                <CheckCircle className="size-12 mx-auto" />
                <p>Thank you for purchasing!</p>
                <Link href={"/library"}>
                  <SheetClose>
                    <Button onClick={() => setCartState("cart")}>
                      View Library
                    </Button>
                  </SheetClose>
                </Link>
                <Button onClick={() => setCartState("cart")}>
                  Back to cart
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
