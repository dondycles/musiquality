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
import { UserData } from "@/types/user-data";
import Link from "next/link";
import CurrencyText from "./currency-text";
import saveSheetToLibrary from "@/actions/save-sheet-to-library";
import { useQueryClient } from "@tanstack/react-query";

export default function PaymentForm({
  total,
  sheets,
  user,
  onFinish,
}: {
  total: number;
  sheets: Pick<SheetData, "id" | "price">[];
  user: UserData | null | undefined;
  onFinish: (state: "error" | "success", message: string) => void;
}) {
  const queryClient = useQueryClient();
  const stripe = useStripe();
  const elements = useElements();
  const [isPaying, setIsPaying] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe) return;
    if (!elements) return;
    if (!user) return;
    setIsPaying(true);

    const { error } = await elements.submit();

    if (error) {
      setIsPaying(false);
      onFinish("error", error.message!);
      return console.log(error);
    }

    const { success } = await createPaymentIntent(total, sheets);

    if (success) {
      const { error } = await stripe?.confirmPayment({
        elements,
        clientSecret: success.clientSecretID!,
        redirect: "if_required",
        confirmParams: {
          receipt_email: user.email,
          return_url: "http://localhost:3000/payment-success/",
        },
      });
      if (error) {
        setIsPaying(false);
        await updateTransaction(success.paymentIntentID, "error");
        onFinish("error", error.message!);
        return console.log(error);
      }
      await updateTransaction(success.paymentIntentID, "success");
      for (const sheet of sheets) {
        await (async () => {
          await saveSheetToLibrary(sheet.id, success.paymentIntentID);
        })();
      }
    }
    queryClient.invalidateQueries({
      queryKey: ["user", user.id],
    });
    onFinish("success", "Done");
    setIsPaying(false);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            className="mt-4"
            disabled={!stripe || !elements || isPaying || !user}
          >
            {isPaying ? (
              "Paying..."
            ) : (
              <>
                Pay{" "}
                <CurrencyText
                  className="ml-2 text-base sm:text-base md:text-base"
                  amount={total / 100}
                />
              </>
            )}
          </Button>
        </>
      ) : (
        <Button className="mt-4" asChild>
          <Link href={"/login"}>Log in to pay</Link>
        </Button>
      )}
    </form>
  );
}
