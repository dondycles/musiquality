import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import createPaymentIntent from "@/actions/create-payment-intent";
import { useState } from "react";
import { SheetData } from "@/types/sheet-data";
import updateTransaction from "@/actions/update-transaction";
import Link from "next/link";
import CurrencyText from "./currency-text";
import saveSheetToLibrary from "@/actions/save-sheet-to-library";
import { UserDataTypes } from "@/actions/get-user";

export default function PaymentForm({
  total,
  sheets,
  user,
  onSuccess,
}: {
  total: number;
  sheets: Pick<SheetData, "id" | "price">[];
  user: UserDataTypes | null;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaying, setIsPaying] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe) return;
    if (!elements) return;
    if (!user) return;
    if (total <= 0) return;
    setIsPaying(true);

    const { error: elementsError } = await elements.submit();

    if (elementsError) {
      setIsPaying(false);
      return console.log(elementsError);
    }

    const intent = await createPaymentIntent(total * 100, sheets);

    const { error: paymentError } = await stripe?.confirmPayment({
      elements,
      clientSecret: intent.client_secret as string,
      redirect: "if_required",
      confirmParams: {
        receipt_email: user.email,
        return_url: "http://localhost:3000/payment-success/",
      },
    });
    if (paymentError) {
      setIsPaying(false);
      await updateTransaction(intent.id, "error");
      return console.log(paymentError);
    }
    await updateTransaction(intent.id, "success");
    for (const sheet of sheets) {
      await (async () => {
        await saveSheetToLibrary(sheet.id, intent.id);
      })();
    }
    setIsPaying(false);
    onSuccess();
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
      {user ? (
        <>
          <LinkAuthenticationElement
            options={{
              defaultValues: {
                email: user.email,
              },
            }}
          />
          <PaymentElement />
          <Button
            className="mt-auto mb-0"
            disabled={!stripe || !elements || isPaying || !user}
          >
            {isPaying ? (
              "Paying..."
            ) : (
              <>
                Pay
                <CurrencyText
                  className="ml-2 text-base sm:text-base md:text-base"
                  amount={total}
                />
              </>
            )}
          </Button>
        </>
      ) : (
        <Button className="mt-auto mb-0" asChild>
          <Link href={"/login"}>Log in to pay</Link>
        </Button>
      )}
    </form>
  );
}
