import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ClassNameValue } from "tailwind-merge";
import Link from "next/link";

export default function ArrangerAvatar({
  url,
  className,
  arranger,
}: {
  url: string | null | undefined;
  className?: ClassNameValue;
  arranger: string;
}) {
  return (
    <Link href={`/arranger/${arranger}`}>
      <Avatar className={cn("size-4", className)}>
        <AvatarImage src={url ?? "/favicon.ico"} alt="arranger" />
        <AvatarFallback className="font-gloock">MQ</AvatarFallback>
      </Avatar>
    </Link>
  );
}
