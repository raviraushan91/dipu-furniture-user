import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";
import { postReview } from "../../store/slices/productSlice";
import { toggleAuthPopup } from "../../store/slices/popupSlice";

const ReviewsContainer = ({ product, productReviews }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const { isPostingReview } = useSelector((state) => state.product);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const reviews = productReviews?.length ? productReviews : [];

  const addReview = async (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;

    if (!authUser?.id) {
      dispatch(toggleAuthPopup());
      return;
    }

    const resultAction = await dispatch(
      postReview({
        productId: product.id,
        rating: Number(newReview.rating),
        comment: newReview.comment.trim(),
      })
    );
    if (postReview.fulfilled.match(resultAction)) {
      setNewReview({ rating: 5, comment: "" });
    }
  };

  return (
    <section className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div className="lg:col-span-3 glass-panel p-4">
        <h3 className="text-lg sm:text-xl font-bold mb-3">Customer Reviews</h3>
        {reviews.length === 0 && (
          <p className="text-muted-foreground text-sm">No reviews yet for {product.name}.</p>
        )}

        <div className="space-y-2.5">
          {reviews.map((review) => (
            <article key={review.id} className="p-3 rounded-lg bg-secondary/60 border border-border/60">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm sm:text-base">{review.user}</p>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${idx < review.rating ? "fill-current" : ""}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mt-1.5 text-sm">{review.comment}</p>
            </article>
          ))}
        </div>
      </div>

      <form onSubmit={addReview} className="lg:col-span-2 glass-panel p-4 h-fit">
        <h4 className="font-semibold mb-3">Write a Review</h4>
        <label className="block text-sm text-muted-foreground mb-2">Rating</label>
        <div className="flex items-center gap-1.5 mb-3">
          {Array.from({ length: 5 }).map((_, idx) => {
            const rate = idx + 1;
            const isActive = rate <= Number(newReview.rating);
            return (
              <button
                key={rate}
                type="button"
                onClick={() => setNewReview((prev) => ({ ...prev, rating: rate }))}
                className="p-1 rounded-md hover:bg-secondary transition-colors"
                aria-label={`Rate ${rate} star`}
              >
                <Star
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-amber-400 fill-amber-400"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            );
          })}
        </div>
        <label className="block text-sm text-muted-foreground mb-2">Comment</label>
        <textarea
          required
          rows={4}
          value={newReview.comment}
          onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg bg-secondary outline-none resize-none"
          placeholder="How was the product quality and comfort?"
        />
        <button className="mt-3 w-full py-2 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm">
          {isPostingReview ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </section>
  );
};

export default ReviewsContainer;

