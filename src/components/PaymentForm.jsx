import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreditCard, Lock } from "lucide-react";
import { clearCart } from "../store/slices/cartSlice";
import { addOrder, clearShippingInfo } from "../store/slices/orderSlice";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.order);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const card = elements.getElement(CardElement);
      if (!card) throw new Error("Card element missing.");
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });
      if (error) throw error;

      dispatch(
        addOrder({
          id: `ORD-${Date.now().toString().slice(-6)}`,
          date: new Date().toISOString(),
          status: "processing",
          total: 0,
          totalItems,
          items: cart,
          shippingInfo,
          paymentStatus: "success",
        })
      );

      dispatch(clearCart());
      dispatch(clearShippingInfo());
      toast.success("Payment successful. Order placed.");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please check your card details.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 space-y-5">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <CreditCard className="w-5 h-5 text-primary" />
        Secure Card Payment
      </div>

      <div className="p-4 rounded-lg bg-secondary">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#111827",
                "::placeholder": { color: "#9ca3af" },
              },
              invalid: { color: "#ef4444" },
            },
          }}
        />
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="w-4 h-4" />
        Payments are encrypted with Stripe PCI-compliant infrastructure.
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing || totalItems <= 0}
        className="w-full py-3 rounded-lg gradient-primary text-primary-foreground font-semibold disabled:opacity-60"
      >
        {isProcessing ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
};

export default PaymentForm;

