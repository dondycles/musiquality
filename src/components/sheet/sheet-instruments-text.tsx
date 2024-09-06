import { cn } from "@/lib/utils";
import { instrumentsSchema } from "@/types/instruments";
import { ClassNameValue } from "tailwind-merge";
import { z } from "zod";

export type instruments = z.infer<typeof instrumentsSchema>;
export default function SheetInstrumentsText({
  instruments,
  className,
}: {
  instruments: instruments;
  className?: ClassNameValue;
}) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>
      {instruments
        .filter((ins) => ins !== "")
        .map((ins, i) => `${ins}${i !== instruments.length - 1 ? ", " : ""}`)}
    </p>
  );
}
