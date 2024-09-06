"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import BrandedText from "./branded-text";
import { Skeleton } from "./ui/skeleton";
import { useContext } from "react";
import SideCart from "./side-cart";
import { Library, LogOut, Music, User } from "lucide-react";
import signOut from "@/actions/sign-out";
import { UserDataContext } from "./user-data-provider";
export default function Nav() {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const { userData, isLoading: userLoading } = useContext(UserDataContext);

  async function logOut() {
    await signOut();
    queryClient.clear();
    window.location.reload();
  }

  return (
    <header className="fixed top-0 left-0 w-full border-b flex justify-between items-center p-4 backdrop-blur bg-background/95 z-10 px-4 lg:px-40 xl:px-64">
      <Link href={"/"}>
        <BrandedText text="MusiQuality" />
      </Link>
      <nav className="flex flex-row gap-4">
        <SideCart user={userData} />
        {userLoading ? (
          <Skeleton className="size-9" />
        ) : userData ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"icon"}
                variant={"outline"}
                className="relative overflow-hidden rounded-full"
              >
                <Image
                  fill
                  src={userData?.avatar_url ?? "/favicon.ico"}
                  alt={userData?.name ?? "User pfp"}
                  className="scale-90 rounded-full"
                  sizes="144px"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={9} className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={"/library"}>
                    <Library size={16} className="mr-1" />
                    <span>Library</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/profile "}>
                    <User size={16} className="mr-1" />
                    <span>User&apos;s Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/arrangers-dashboard"}>
                    <Music size={16} className="mr-1" />
                    <span>Arranger&apos;s Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logOut}>
                  <LogOut size={16} className="mr-1" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button asChild>
              {pathname === "/login" ? (
                <Link href={"/signup"}>Sign Up</Link>
              ) : (
                <Link href={"/login"}>Log In</Link>
              )}
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
