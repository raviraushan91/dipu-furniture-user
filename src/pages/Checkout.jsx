import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShippingInfo } from "../store/slices/orderSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.order);

  const [form, setForm] = useState({
    full_name: shippingInfo?.full_name || "",
    phone: shippingInfo?.phone || "+91",
    address: shippingInfo?.address || "",
    city: shippingInfo?.city || "",
    state: shippingInfo?.state || "",
    country: shippingInfo?.country || "India",
    pincode: shippingInfo?.pincode || "",
    delivery_date: shippingInfo?.delivery_date || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setShippingInfo(form));
    navigate("/payment");
  };

  if (!cart.length) {
    return (
      <div className="pt-20 pb-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="glass-panel py-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add products to continue checkout.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg gradient-primary text-primary-foreground"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 glass-panel p-4 md:p-5 grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            <h2 className="md:col-span-2 text-xl md:text-2xl font-bold">
              Shipping Address
            </h2>

            <input
              required
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="border px-3.5 py-2.5 rounded-lg bg-secondary"
              placeholder="Full Name"
            />
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border px-3.5 py-2.5 rounded-lg bg-secondary"
              placeholder="+91XXXXXXXXXX"
            />
            <input
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="md:col-span-2 border px-3.5 py-2.5 rounded-lg bg-secondary"
              placeholder="Address"
            />
            <input
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="border px-3.5 py-2.5 rounded-lg bg-secondary"
              placeholder="City"
            />
            <input
              required
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="border px-3.5 py-2.5 rounded-lg bg-secondary"
              placeholder="State"
            />
            <input
              required
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="border px-3.5 py-2.5 rounded-lg bg-secondary"
              placeholder="Country"
            />
            <input
              required
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              className="border px-3.5 py-2.5 rounded-lg bg-secondary"
              placeholder="Pincode"
            />
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm text-muted-foreground">
                Preferred Delivery Date
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={form.delivery_date}
                onChange={(e) =>
                  setForm({ ...form, delivery_date: e.target.value })
                }
                className="w-full border px-3.5 py-2.5 rounded-lg bg-secondary"
              />
            </div>

            <button
              type="submit"
              className="md:col-span-2 mt-1.5 w-full py-2.5 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm inline-flex items-center justify-center gap-2"
            >
              Proceed to Payment
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <aside className="glass-panel p-4 h-fit">
            <h3 className="text-lg font-semibold mb-3">Order Snapshot</h3>
            <p className="text-sm text-muted-foreground">
              Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

