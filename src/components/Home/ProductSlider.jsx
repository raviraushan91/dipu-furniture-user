import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductSlider = ({ title, products }) => {
  const sliderRef = useRef(null);
  const dispatch = useDispatch();

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -width * 0.9 : width * 0.9,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-6">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-lg md:text-2xl font-semibold text-foreground main-highlight">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2.5 rounded-full bg-secondary hover:bg-muted"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2.5 rounded-full bg-secondary hover:bg-muted"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div ref={sliderRef} className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 pb-2">
          {products.map((product) => (
            <article
              key={String(product.id)}
              className="min-w-[195px] sm:min-w-[225px] glass-card p-2.5 flex flex-col rounded-xl"
            >
              <Link to={`/product/${product.id}`} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src={product.image || product.images?.[0] || ""}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="pt-3">
                <p className="text-[11px] tracking-[0.16em] uppercase text-primary">{product.category}</p>
                <Link to={`/product/${product.id}`} className="font-semibold text-sm sm:text-base text-foreground line-clamp-2">
                  {product.name}
                </Link>
                <div className="mt-2 flex items-center justify-end gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm text-foreground">{product.rating}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
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
                    href={product.queryPhone ? `tel:${product.queryPhone}` : undefined}
                    onClick={(e) => {
                      if (!product.queryPhone) {
                        e.preventDefault();
                        toast.info("Query number unavailable for this product.");
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 w-full px-2 py-2 rounded-xl border border-border hover:bg-secondary text-xs font-medium"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Call
                  </a>
                  <a
                    href={
                      (product.whatsappPhone || product.queryPhone)
                        ? `https://wa.me/${(product.whatsappPhone || product.queryPhone).replace(
                            /[^\d]/g,
                            ""
                          )}`
                        : undefined
                    }
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      if (!(product.whatsappPhone || product.queryPhone)) {
                        e.preventDefault();
                        toast.info("WhatsApp number unavailable for this product.");
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 w-full px-2 py-2 rounded-xl border border-border hover:bg-secondary text-xs font-medium"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;

