import { useEffect, useState } from "react";
import {
  X,
  Home,
  Package,
  Info,
  HelpCircle,
  ShoppingCart,
  List,
  Phone,
  Heart,
  UserRound,
  PencilLine,
  Trash2,
  LogOut,
  LogIn,
  ClipboardPenLine,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthPopup, toggleSidebar } from "../../store/slices/popupSlice";
import { deleteAccount, logout, updateProfile } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.popup);
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [showNameEditor, setShowNameEditor] = useState(false);

  useEffect(() => {
    setName(authUser?.name || "");
    setShowNameEditor(false);
  }, [authUser]);

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/products", label: "Products", icon: Package },
    { to: "/post-requirement", label: "Post Requirement", icon: ClipboardPenLine },
    { to: "/wishlist", label: "Wishlist", icon: Heart },
    { to: "/cart", label: "Cart", icon: ShoppingCart },
    { to: "/orders", label: "My Orders", icon: List },
    { to: "/about", label: "About", icon: Info },
    { to: "/faq", label: "FAQ", icon: HelpCircle },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  const isAuthenticated = Boolean(authUser?.email);

  const updateName = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Name cannot be empty.");
      return;
    }
    dispatch(updateProfile({ name: trimmed, email: authUser.email }));
  };

  const removeAccount = () => {
    const ok = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!ok) return;
    dispatch(deleteAccount());
    dispatch(toggleSidebar());
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/45 backdrop-blur-sm transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch(toggleSidebar())}
      />

      <aside
        className={`fixed left-0 top-0 h-full w-[22rem] max-w-[90vw] z-50 gradient-glass border-r border-[hsla(var(--glass-border))] transform transition-transform duration-300 flex flex-col shadow-[0_18px_45px_-26px_rgba(0,0,0,0.6)] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-[4.6rem] px-5 border-b border-border/60 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Navigation</p>
            <h2 className="text-2xl font-semibold leading-none">Explore Store</h2>
          </div>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-xl hover:bg-secondary transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
          <nav className="space-y-2">
            {links.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => dispatch(toggleSidebar())}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-secondary text-foreground transition-colors"
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="border-t border-border pt-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Account
            </h3>

            {!isAuthenticated ? (
              <button
                onClick={() => {
                  dispatch(toggleSidebar());
                  dispatch(toggleAuthPopup());
                }}
                className="btn-primary w-full"
              >
                <LogIn className="w-4 h-4" />
                Login / Signup
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => setShowNameEditor((prev) => !prev)}
                  className="w-full flex items-center justify-between gap-2 text-sm px-3 py-3 rounded-xl bg-secondary hover:bg-muted transition-colors"
                >
                  <span className="inline-flex items-center gap-2 min-w-0">
                    <UserRound className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium truncate">{authUser.name}</span>
                  </span>
                  <PencilLine className="w-4 h-4 text-muted-foreground shrink-0" />
                </button>

                {showNameEditor && (
                  <form onSubmit={updateName} className="space-y-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-secondary outline-none text-sm"
                      placeholder="Enter new name"
                    />
                    <button type="submit" disabled={isUpdatingProfile} className="btn-primary w-full">
                      {isUpdatingProfile ? "Updating..." : "Save Name"}
                    </button>
                  </form>
                )}

                <button
                  onClick={() => {
                    dispatch(logout());
                    dispatch(toggleSidebar());
                  }}
                  className="btn-ghost w-full !py-3"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>

                <button
                  onClick={removeAccount}
                  className="w-full py-3 rounded-xl bg-red-500/10 text-red-500 text-sm inline-flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

