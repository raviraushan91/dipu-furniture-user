import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/Products/ProductCard";
import { clearWishlist } from "../store/slices/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  return (
    <div className="pt-20 pb-8 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h1 className="page-title main-highlight flex items-center gap-2">
            <Heart className="w-7 h-7 text-rose-500" />
            My Wishlist
          </h1>
          {items.length > 0 && (
            <button
              onClick={() => dispatch(clearWishlist())}
              className="px-4 py-2.5 rounded-lg bg-red-500/10 text-red-500 font-medium"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="glass-panel py-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Product card par heart icon press karke yahan save karo.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-5 py-3 rounded-lg gradient-primary text-primary-foreground font-semibold"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

