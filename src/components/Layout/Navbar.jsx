import { useState } from "react";
import { Menu, User, ShoppingCart, Sun, Moon, Search, Heart } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dipuLogo from "../../assets/dipu-logo.svg";
import {
  toggleAuthPopup,
  toggleCart,
  toggleSearchBar,
  toggleSidebar,
} from "../../store/slices/popupSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const [showAccountName, setShowAccountName] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { authUser } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const isAuthenticated = Boolean(authUser?.email);

  const cartItemsCount = cart
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;
  const wishlistCount = wishlistItems?.length || 0;

  return (
    <nav className="fixed left-0 w-full top-0 z-50">
      <div className="container mx-auto pt-2.5 sm:pt-3.5">
        <div className="glass-panel relative overflow-hidden px-2.5 sm:px-4 h-14 sm:h-[3.8rem] flex items-center justify-between gap-2">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
          <div className="flex items-center gap-1.5 min-w-0">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="relative z-10 p-2 rounded-xl hover:bg-secondary transition-colors shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            <Link to="/" className="relative z-10 flex items-center gap-2 min-w-0">
              <img
                src={dipuLogo}
                alt="Dipu Furniture logo"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover shrink-0 ring-1 ring-border/70"
              />
              <span className="gradient-primary bg-clip-text text-transparent text-base sm:text-xl font-semibold tracking-wide leading-none truncate">
                <span className="hidden sm:inline">Dipu Furniture</span>
                <span className="sm:hidden">Dipu</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-1 lg:gap-2 relative z-10">
            <Link to="/products" className="btn-ghost !py-2 !px-3">
              Collection
            </Link>
            <Link to="/about" className="btn-ghost !py-2 !px-3">
              Story
            </Link>
            <Link to="/contact" className="btn-ghost !py-2 !px-3">
              Studio
            </Link>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1.5 shrink-0 relative z-10">
            <button
              onClick={toggleTheme}
              className="hidden sm:inline-flex p-2 rounded-xl hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-foreground" />
              )}
            </button>

            <button
              onClick={() => dispatch(toggleSearchBar())}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
              aria-label="Search products"
            >
              <Search className="w-5 h-5 text-foreground" />
            </button>

            <div className="relative">
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    dispatch(toggleAuthPopup());
                    return;
                  }
                  setShowAccountName((prev) => !prev);
                }}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
                aria-label="User account"
              >
                <User className="w-5 h-5 text-foreground" />
              </button>
              {showAccountName && isAuthenticated && (
                <div className="absolute right-0 top-11 px-3 py-2 rounded-xl bg-card border border-border text-sm shadow-lg whitespace-nowrap max-w-[70vw] truncate">
                  {authUser.name}
                </div>
              )}
            </div>

            <Link
              to="/wishlist"
              className="relative hidden sm:inline-flex p-2 rounded-xl hover:bg-secondary transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-foreground" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  toast.info("Please login to access cart.");
                  dispatch(toggleAuthPopup());
                  return;
                }
                dispatch(toggleCart());
              }}
              className="relative p-2 rounded-xl hover:bg-secondary transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

