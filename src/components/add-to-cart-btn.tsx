"use client";

import { Button } from "./ui/button";
import { SheetData } from "@/types/sheet-data";
import { useCartStore } from "../../store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import getUser from "@/actions/get-user";
import {
  Check,
  ClipboardCheck,
  ListCheck,
  ShoppingCart,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import CurrencyText from "./currency-text";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export default function AddToCartBtn({
  sheet,
  containerClassName,
  textClassName,
}: {
  sheet: SheetData;
  containerClassName?: ClassNameValue;
  textClassName?: ClassNameValue;
}) {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const cart = useCartStore();
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await getUser(),
    enabled: userId !== null,
  });

  const isBought = Boolean(
    user?.success?.library.find((item) => item.sheets?.id === sheet.id)
  );

  const isCarted = Boolean(cart.cart.find((item) => item.id === sheet.id));

  useEffect(() => {
    async function _setUserId() {
      const id = (await supabase.auth.getUser()).data.user?.id;
      if (!id) return;
      setUserId(id);
    }
    _setUserId();
  }, [supabase]);

  if (userLoading) return <Skeleton className="mt-auto mb-0 h-10 w-full" />;
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
          className={cn("flex-1 w-full", textClassName)}
          amount={sheet.price}
        />
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                if (isBought) return;
                if (isCarted) return cart.removeToCart(sheet);
                cart.addToCart(sheet);
              }}
              size={"icon"}
              variant={
                isCarted ? "destructive" : isBought ? "ghost" : "default"
              }
            >
              {isCarted ? (
                <X size={16} />
              ) : isBought ? (
                <Check className="text-green-500" />
              ) : (
                <ShoppingCart size={16} />
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
    </div>
  );
}
