import { Music, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

export default function ArrangerBadges({
  sheets,
  followers,
  stars,
  packages,
  className,
}: {
  sheets?: number;
  followers?: number;
  stars?: number;
  packages?: number;
  className?: ClassNameValue;
}) {
  return (
    <div className={cn("flex gap-1", className)}>
      {sheets != undefined && (
        <Badge variant={"outline"} className="w-fit">
          {sheets} <Music size={12} className="ml-1" />
        </Badge>
      )}
      {followers != undefined && (
        <Badge variant={"outline"} className="w-fit">
          {followers} <Users size={12} className="ml-1" />
        </Badge>
      )}
    </div>
  );
}
