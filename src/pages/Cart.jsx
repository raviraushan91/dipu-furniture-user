import { Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  removeFromCart,
} from "../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  return (
    <div className="pt-20 pb-8 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="page-title main-highlight mb-4">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="glass-panel py-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Browse products and add your favorites.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg gradient-primary text-primary-foreground"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-3">
              {cart.map((item) => (
                <article key={item.id} className="glass-card p-3 flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm sm:text-base line-clamp-2">{item.name}</p>

                    <div className="mt-2.5 flex items-center gap-2">
                      <div className="flex items-center gap-2 bg-secondary rounded-lg p-1 border border-border/60">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="p-1 rounded-md hover:bg-background"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className="p-1 rounded-md hover:bg-background"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="p-2 rounded-md text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="font-bold text-sm sm:text-base whitespace-nowrap">Qty: {item.quantity}</p>
                </article>
              ))}
            </div>

            <aside className="glass-panel p-4 h-fit">
              <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Items</span>
                  <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-4 w-full py-2.5 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm inline-flex items-center justify-center gap-2"
              >
                Add Address
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => dispatch(clearCart())}
                className="w-full mt-2.5 py-2 rounded-lg bg-red-500/10 text-red-500 text-sm font-medium"
              >
                Clear Cart
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

