import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  PhoneCall,
  MessageCircle,
  Plus,
  Minus,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ReviewsContainer from "../components/Products/ReviewsContainer";
import ProductCard from "../components/Products/ProductCard";
import { addToCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";
import { fetchProductDetails } from "../store/slices/productSlice";
import { recommendProducts } from "../utils/recommendProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, productDetails, productReviews, loading } = useSelector(
    (state) => state.product
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");

  const product =
    products.find((item) => String(item.id) === String(id)) ||
    (String(productDetails?.id) === String(id) ? productDetails : null);
  const relatedProducts = useMemo(
    () => recommendProducts(product, products, 4),
    [product, products]
  );

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.images?.[0] || product.image);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [product]);

  if (loading && !product) {
    return (
      <div className="pt-20 min-h-screen container mx-auto px-4">
        <div className="glass-panel py-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Loading product...</h1>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 min-h-screen container mx-auto px-4">
        <div className="glass-panel py-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <p className="text-muted-foreground">The requested item is unavailable.</p>
        </div>
      </div>
    );
  }

  const addItems = () => {
    for (let i = 0; i < quantity; i += 1) {
      dispatch(addToCart(product));
    }
    toast.success(
      quantity > 1
        ? `${quantity} items successfully added to cart`
        : "Successfully added to cart"
    );
  };

  return (
    <div className="pt-20 pb-7 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <div className="xl:col-span-5 glass-panel p-3.5 h-fit">
            <div className="aspect-[5/4] overflow-hidden rounded-lg">
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {(product.images?.length ? product.images : [product.image]).map((img) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(img)}
                  className={`overflow-hidden rounded-md border ${
                    activeImage === img ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={img} alt={product.name} className="w-full h-16 sm:h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="xl:col-span-7 glass-panel p-4 md:p-5">
            <p className="text-xs text-primary font-semibold tracking-[0.14em] uppercase">{product.category}</p>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">{product.name}</h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-foreground">{product.rating}</span>
              </div>
              <span className="text-muted-foreground text-xs sm:text-sm">({product.reviewsCount} reviews)</span>
            </div>

            <div className="mt-2 text-sm text-muted-foreground font-medium">
              Price available on request
            </div>

            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-sm">
              <div className="p-2.5 rounded-lg bg-secondary border border-border/60">
                <p className="text-muted-foreground text-xs">Material</p>
                <p className="font-medium text-sm">{product.material || "To be shared by seller"}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-secondary border border-border/60">
                <p className="text-muted-foreground text-xs">Dimensions</p>
                <p className="font-medium text-sm">{product.dimensions || "To be shared by seller"}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-secondary border border-border/60">
                <p className="text-muted-foreground text-xs">Delivery</p>
                <p className="font-medium text-sm">{product.delivery}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5 items-center">
              <div className="flex items-center gap-2 bg-secondary rounded-lg p-1.5 border border-border/60">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="p-1 rounded-md hover:bg-background"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-7 text-center font-semibold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="p-1 rounded-md hover:bg-background"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={addItems}
                className="btn-primary !px-4 !py-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>

              <button className="p-2.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border/60">
                <Heart className="w-4 h-4" />
              </button>
              <button className="p-2.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border/60">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              <a
                href={product.queryPhone ? `tel:${product.queryPhone}` : undefined}
                onClick={(e) => {
                  if (!product.queryPhone) {
                    e.preventDefault();
                    toast.info("Query number unavailable for this product.");
                  }
                }}
                className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg border border-border hover:bg-secondary transition-colors text-sm font-semibold"
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
                className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg border border-border hover:bg-secondary text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <ReviewsContainer product={product} productReviews={productReviews} />

        <section className="mt-8">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold main-highlight">Best For You</h2>
            {/* <p className="text-xs sm:text-sm text-muted-foreground">
              ML-based similar products
            </p> */}
          </div>
          {relatedProducts.length === 0 ? (
            <div className="glass-panel py-8 text-center text-sm text-muted-foreground">
              No similar products found yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
