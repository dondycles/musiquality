"use client";

import { Button } from "./ui/button";
import { SheetData } from "@/types/sheet-data";
import { useCartStore } from "../../store";
import { useContext } from "react";

import { Check, ShoppingCart, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import CurrencyText from "./currency-text";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import { UserDataContext } from "./user-data-provider";
export default function AddToCartBtn({
  sheet,
  containerClassName,
  textClassName,
  branded,
}: {
  sheet: SheetData;
  containerClassName?: ClassNameValue;
  textClassName?: ClassNameValue;
  branded?: boolean;
}) {
  const { userData, isLoading } = useContext(UserDataContext);
  const cart = useCartStore();
  const isBought =
    !isLoading &&
    Boolean(userData?.library.find((item) => item.sheets?.id === sheet.id));

  const isCarted =
    !isLoading && Boolean(cart.cart.find((item) => item.id === sheet.id));

  const isArranger = Boolean(sheet.arranger_id === userData?.id);

  return (
    <div
      className={cn(
        "mt-auto mb-0 flex flex-row gap-4 justify-between items-center w-full",
        containerClassName
      )}
    >
      {isBought ? (
        <p className="text-xs text-muted-foreground">Purchased</p>
      ) : (
        <CurrencyText
          branded={branded}
          className={cn("flex-1 w-full", textClassName)}
          amount={sheet.price}
        />
      )}
      {!isArranger && !isBought && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isLoading}
                onClick={() => {
                  if (isBought) return;
                  if (isCarted) return cart.removeToCart(sheet);
                  cart.addToCart(sheet);
                }}
                size={"icon"}
                variant={isCarted ? "destructive" : "ghost"}
              >
                {isCarted ? (
                  <motion.div
                    key={"carted"}
                    initial={{ rotate: 90, scale: 0.75 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -90, scale: 0.75 }}
                  >
                    <X size={16} />
                  </motion.div>
                ) : (
                  <motion.div
                    key={"initial"}
                    initial={{ scale: 0.75, x: -10 }}
                    animate={{ scale: 1, x: 0 }}
                    exit={{ scale: 0.75, x: 10 }}
                  >
                    <ShoppingCart size={16} />
                  </motion.div>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isCarted
                  ? "Remove from cart"
                  : isBought
                  ? "Purchased"
                  : "Add to cart"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
