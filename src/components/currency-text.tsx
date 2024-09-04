import { ClassNameValue } from "tailwind-merge";
import BrandedText from "./branded-text";

export default function CurrencyText({
  amount,
  className,
}: {
  amount: number;
  className?: ClassNameValue;
}) {
  const moneyFormatter = Intl.NumberFormat("en-US", {
    currency: "USD",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <BrandedText
      className={className}
      text={String(moneyFormatter.format(amount))}
    />
  );
}
