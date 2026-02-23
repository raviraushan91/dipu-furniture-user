import React from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";
import { toggleWishlist } from "../../store/slices/wishlistSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);
  const isWishlisted = items.some((item) => String(item.id) === String(product.id));
  const productImage = product.image || product.images?.[0] || "";
  const callNumber = product.queryPhone || "";
  const whatsappNumber = (product.whatsappPhone || callNumber).replace(/[^\d]/g, "");

  return (
    <article className="glass-card p-2.5 h-full flex flex-col rounded-xl">
      <div className="relative">
        <Link to={`/product/${product.id}`} className="group">
          <div className="aspect-[5/4] rounded-lg overflow-hidden bg-secondary">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
        <button
          type="button"
          onClick={() => {
            dispatch(toggleWishlist(product));
            toast.success(
              isWishlisted
                ? "Removed from wishlist"
                : "Added to wishlist successfully"
            );
          }}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md border transition-colors ${
            isWishlisted
              ? "bg-red-500/20 border-red-400/50 text-red-500"
              : "bg-black/30 border-white/20 text-white hover:bg-black/45"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="pt-3 flex-1 flex flex-col">
        <p className="text-[11px] tracking-[0.16em] uppercase text-primary font-semibold">
          {product.category}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="font-semibold text-sm sm:text-base mt-1 hover:text-primary transition-colors line-clamp-2"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex items-center justify-end gap-1 text-amber-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm text-foreground">{product.rating || 4.5}</span>
          <span className="text-xs text-muted-foreground">({product.reviewsCount || 0})</span>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <div />
          <button
            onClick={() => {
              dispatch(addToCart(product));
              toast.success("Successfully added to cart");
            }}
            className="btn-primary !px-2.5 !py-1.5 rounded-lg text-xs"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <a
            href={callNumber ? `tel:${callNumber}` : undefined}
            onClick={(e) => {
              if (!callNumber) {
                e.preventDefault();
                toast.info("Query number unavailable for this product.");
              }
            }}
            className="inline-flex items-center justify-center gap-2 w-full px-2 py-2 rounded-lg border border-border hover:bg-secondary text-xs font-medium"
          >
            <PhoneCall className="w-4 h-4" />
            Call
          </a>
          <a
            href={whatsappNumber ? `https://wa.me/${whatsappNumber}` : undefined}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              if (!whatsappNumber) {
                e.preventDefault();
                toast.info("WhatsApp number unavailable for this product.");
              }
            }}
            className="inline-flex items-center justify-center gap-2 w-full px-2 py-2 rounded-lg border border-border hover:bg-secondary text-xs font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

