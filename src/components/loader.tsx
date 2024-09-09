import { ClassNameValue } from "tailwind-merge";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

export default function Loader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassNameValue;
}) {
  return (
    <Skeleton className={cn("h-32 w-full", className)}>{children}</Skeleton>
  );
}
