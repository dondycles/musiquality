"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  FiDollarSign,
  FiLogOut,
  FiMusic,
  FiShoppingCart,
} from "react-icons/fi";
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
import Image from "next/image";
import BrandedText from "./branded-text";
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
    <header className="fixed top-0 left-0 w-full border-b flex justify-between items-center p-4 backdrop-blur bg-background/95 z-10">
      <Link href={"/"}>
        <BrandedText text="MusiQuality" />
      </Link>
      <nav className="flex flex-row gap-4">
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
        {user?.success ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"icon"}
                variant={"outline"}
                className="relative overflow-hidden rounded-full"
              >
                <Image
                  fill
                  src={user.success?.avatar_url ?? "/favicon.ico"}
                  alt={user.success?.name ?? "User pfp"}
                  className="scale-90 rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={9} className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild onClick={logOut}>
                  <Link href={"/library"}>
                    <MdLibraryBooks className="mr-2 h-4 w-4" />
                    <span>Library</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/arrangers-dashboard"}>
                    <FiMusic className="mr-2 h-4 w-4" />
                    <span>Arranger&apos;s Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logOut}>
                  <FiLogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            {pathname === "/login" ? (
              <Link href={"/signup"}>Sign Up</Link>
            ) : (
              <Link href={"/login"}>Log In</Link>
            )}
          </Button>
        )}
      </nav>
    </header>
  );
}
