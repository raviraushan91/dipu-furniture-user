import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../../store/slices/cartSlice";
import { toggleCart } from "../../store/slices/popupSlice";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector((state) => state.popup);
  const { cart } = useSelector((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch(toggleCart())}
      />

      <aside
        className={`fixed right-0 top-0 h-full w-[22rem] max-w-[94vw] z-50 glass border-l border-[hsla(var(--glass-border))] transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-16 px-5 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-lg">Your Cart</h2>
          <button
            className="p-2 rounded-md hover:bg-secondary"
            onClick={() => dispatch(toggleCart())}
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="h-[calc(100%-9.5rem)] overflow-y-auto p-3.5 space-y-2.5">
          {cart.length === 0 && (
            <div className="h-full flex flex-col justify-center items-center text-center px-4">
              <p className="text-lg font-semibold mb-2">Cart is empty</p>
              <p className="text-sm text-muted-foreground">Add products to continue checkout.</p>
            </div>
          )}

          {cart.map((item) => (
            <div key={item.id} className="p-2.5 rounded-xl bg-secondary/60 border border-border/60 flex gap-2.5">
              <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="p-1.5 rounded-md bg-background hover:bg-background/80"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                  <button
                    className="p-1.5 rounded-md bg-background hover:bg-background/80"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    className="p-1.5 rounded-md hover:bg-red-500/10 ml-auto text-red-500"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-20 border-t border-border p-3.5">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Total Items</span>
            <span className="font-bold">{totalItems}</span>
          </div>
          <Link
            to="/cart"
            onClick={() => dispatch(toggleCart())}
            className="block text-center w-full py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold"
          >
            View Cart
          </Link>
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;

