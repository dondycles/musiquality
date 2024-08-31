import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import createPayementIntent from "@/actions/create-payment-intent";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe) return;
    if (!elements) return;
    const { error } = await elements.submit();
    if (error) return console.log(error);
    const { success } = await createPayementIntent(2000);
    if (success) {
      const { error } = await stripe?.confirmPayment({
        elements,
        clientSecret: success.clientSecretID!,
        redirect: "if_required",
        confirmParams: {
          return_url: "https://localhost:3000/success",
          receipt_email: "dondycles@gmail.com",
        },
      });
      if (error) return console.log(error);
    }
    console.log("Done!");
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <AddressElement options={{ mode: "shipping" }} />
      <Button disabled={!stripe || !elements}>Submit</Button>
    </form>
  );
}
