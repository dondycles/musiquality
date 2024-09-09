import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ClassNameValue } from "tailwind-merge";
import Link from "next/link";

export default function UserAvatar({
  url,
  className,
  user,
}: {
  url: string | null | undefined;
  className?: ClassNameValue;
  user: string;
}) {
  return (
    <Link href={`/profile/${user}`}>
      <Avatar className={cn("size-4", className)}>
        <AvatarImage src={url ?? "/favicon.ico"} alt="user" />
        <AvatarFallback className="font-gloock">MQ</AvatarFallback>
      </Avatar>
    </Link>
  );
}
