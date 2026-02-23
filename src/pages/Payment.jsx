import { useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { placeOrderRequest } from "../store/slices/orderSlice";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { shippingInfo, placingOrder } = useSelector((state) => state.order);

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
      return;
    }
    if (!shippingInfo) {
      navigate("/checkout");
    }
  }, [cart.length, shippingInfo, navigate]);

  const cartItems = cart;
  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <div className="pt-20 pb-8 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className="glass-panel p-5 h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Breakdown</h3>
            {shippingInfo && (
              <div className="mb-4 p-3 rounded-lg bg-secondary/70 text-sm">
                <p className="font-semibold">{shippingInfo.full_name}</p>
                <p className="text-muted-foreground">{shippingInfo.phone}</p>
                <p className="text-muted-foreground">
                  {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}
                </p>
                <p className="text-muted-foreground">
                  {shippingInfo.country} - {shippingInfo.pincode}
                </p>
                {shippingInfo.delivery_date && (
                  <p className="text-muted-foreground">
                    Delivery Date:{" "}
                    {new Date(shippingInfo.delivery_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
            <div className="mb-4 p-4 rounded-lg bg-secondary/70 text-center">
              <p className="text-sm font-semibold">Dillers contact soon</p>
            </div>

            <div className="space-y-2 text-sm border-t border-border pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Items</span>
                <span>{totalItems}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                dispatch(placeOrderRequest()).then((action) => {
                  if (placeOrderRequest.fulfilled.match(action)) {
                    navigate("/orders");
                  }
                })
              }
              disabled={placingOrder || cart.length === 0}
              className="mt-4 w-full py-3 rounded-lg gradient-primary text-primary-foreground font-semibold disabled:opacity-60"
            >
              {placingOrder ? "Placing Order..." : "Confirm Order"}
            </button>

            <div className="mt-5 p-3 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm flex items-center gap-2">
              <Check className="w-4 h-4" />
              Secure checkout enabled
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Payment;

