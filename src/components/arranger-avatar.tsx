import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ClassNameValue } from "tailwind-merge";

export default function ArrangerAvatar({
  url,
  className,
}: {
  url: string | null | undefined;
  className?: ClassNameValue;
}) {
  return (
    <Avatar className={cn("size-4", className)}>
      <AvatarImage src={url ?? "/favicon.ico"} alt="arranger" />
      <AvatarFallback className="font-gloock">MQ</AvatarFallback>
    </Avatar>
  );
}
