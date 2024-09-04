import { SheetData } from "@/types/sheet-data";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Cart = {
  cart: SheetData[];
  addToCart: (sheet: SheetData) => void;
  removeToCart: (sheet: SheetData) => void;
  resetCart: () => void;
};

export const useCartStore = create<Cart>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (sheetToBeAdded) =>
        set((state) => {
          const existingItem = state.cart.find(
            (sheet) => sheet.id === sheetToBeAdded.id
          );
          if (existingItem) {
            return { cart: state.cart };
          } else return { cart: [...state.cart, sheetToBeAdded] };
        }),
      removeToCart: (sheetTobeRemoved) =>
        set((state) => {
          return {
            cart: state.cart.filter(
              (sheet) => sheet.id !== sheetTobeRemoved.id
            ),
          };
        }),
      resetCart: () =>
        set(() => {
          return { cart: [] };
        }),
    }),
    { name: "cart" }
  )
);
