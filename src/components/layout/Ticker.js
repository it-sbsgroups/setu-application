const MESSAGES = [
  "🔄 Replacement-only policy — wrong or damaged items replaced free",
  "⚡ Same-day dispatch for orders before 2 PM",
  "🛡️ Pre & post-warranty support · tele-caller team · 10 AM – 6 PM",
  "🔧 Over 10 lakh industrial products",
  "🔒 End-to-end encrypted — your data is never shared",
  "🏆 Trusted by 50,000+ businesses across India",
];

export default function Ticker() {
  // Rendered twice back-to-back so the CSS marquee animation (-50%) loops seamlessly.
  const doubled = [...MESSAGES, ...MESSAGES];

  return (
    <div className="overflow-hidden bg-primary py-1 text-xs">
      <div className="ticker-inner flex whitespace-nowrap">
        {doubled.map((message, i) => (
          <span key={i} className="mr-12 font-medium text-white">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
