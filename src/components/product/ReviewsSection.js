import StarRating from "@/components/ui/StarRating";

export default function ReviewsSection({ product }) {
  const { rating, reviews: reviewCount, ratingBreakdown, reviews } = product;

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-base font-bold text-gray-900">Reviews &amp; Ratings</h2>
        <button type="button" className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primarydark">
          Write a Review
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="shrink-0 text-center">
          <div className="text-4xl font-black text-gray-900">{rating.toFixed(1)}</div>
          <StarRating rating={rating} />
          <div className="mt-1 text-xs text-gray-400">{reviewCount.toLocaleString("en-IN")} ratings</div>
        </div>
        <div className="flex-1 space-y-1.5">
          {ratingBreakdown.map((pct, i) => {
            const stars = 5 - i;
            return (
              <div key={stars} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-8 shrink-0">{stars} ★</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 shrink-0 text-right">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 border-t border-gray-100 pt-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
            <div className="mb-1 flex items-center gap-2">
              <StarRating rating={review.rating} />
              {review.verified && <span className="text-[10px] font-semibold text-green-600">Verified Purchase</span>}
            </div>
            <p className="text-sm font-semibold text-gray-800">{review.title}</p>
            <p className="mt-1 text-sm text-gray-600">{review.body}</p>
            <div className="mt-2 flex items-center gap-3 text-[11px] text-gray-400">
              <span>{review.name}</span>
              <span>·</span>
              <span>{review.age}</span>
              <span>·</span>
              <span>👍 Helpful ({review.helpful})</span>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="mt-4 text-xs font-semibold text-primary">
        View all {reviewCount.toLocaleString("en-IN")} reviews →
      </button>
    </div>
  );
}
