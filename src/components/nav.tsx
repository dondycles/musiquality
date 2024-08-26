"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { FiDollarSign, FiLogOut, FiShoppingCart } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getUser from "@/actions/getuser";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { MdLibraryBooks } from "react-icons/md";
export default function Nav() {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const supabase = createClient();
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
  });
  async function logOut() {
    await supabase.auth.signOut();
    queryClient.clear();
    window.location.reload();
  }
  return (
    <nav className="fixed top-0 left-0 w-full border-b flex justify-between items-center p-4 backdrop-blur bg-background/95 z-10">
      <Link href={"/"} className="font-gloock font-black text-4xl">
        MusiQuality
      </Link>
      <div className="flex flex-row gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <FiShoppingCart />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <FiShoppingCart />
                Your cart
              </SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when youre done.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        {!user ? (
          <Button asChild>
            {pathname === "/login" ? (
              <Link href={"/signup"}>Sign Up</Link>
            ) : (
              <Link href={"/login"}>Log In</Link>
            )}
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>{user.email}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={logOut}>
                  <MdLibraryBooks className="mr-2 h-4 w-4" />
                  <span>My Sheets</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FiDollarSign className="mr-2 h-4 w-4" />
                  <span>Seller&apos;s Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logOut}>
                  <FiLogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
