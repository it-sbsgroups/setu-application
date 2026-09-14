export default function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const color = i <= Math.floor(rating) ? "text-amber-400" : i - 0.5 <= rating ? "text-amber-300" : "text-gray-300";
        return (
          <span key={i} className={color} style={{ fontSize: 11, lineHeight: 1 }} aria-hidden="true">
            ★
          </span>
        );
      })}
    </div>
  );
}
