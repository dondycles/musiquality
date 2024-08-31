import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

export default function BrandedText({
  text,
  className,
}: {
  text: string;
  className?: ClassNameValue;
}) {
  return (
    <span className={cn("font-gloock font-black text-4xl", className)}>
      {text}
    </span>
  );
}
