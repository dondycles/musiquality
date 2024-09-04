"use client";

import { FiShoppingCart } from "react-icons/fi";
import { Button } from "./ui/button";
import { SheetData } from "@/types/sheet-data";
import { useCartStore } from "../../store";

export default function AddToCartBtn({ sheet }: { sheet: SheetData }) {
  const cart = useCartStore();

  return (
    <Button
      onClick={() => cart.addToCart(sheet)}
      size={"icon"}
      variant={"outline"}
    >
      <FiShoppingCart />
    </Button>
  );
}
