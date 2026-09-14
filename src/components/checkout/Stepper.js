import { CHECKOUT_STEPS } from "@/lib/data/checkout";

export default function Stepper({ current }) {
  const activeIndex = CHECKOUT_STEPS.findIndex((s) => s.id === current);

  return (
    <ol
      aria-label="Checkout progress"
      className="flex items-center gap-2 sm:gap-4"
    >
      {CHECKOUT_STEPS.map((step, i) => {
        const isDone = i < activeIndex;
        const isActive = i === activeIndex;
        return (
          <li key={step.id} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : isDone
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isDone ? "✓" : i + 1}
              </span>
              <span
                className={`text-xs font-semibold sm:text-sm ${
                  isActive
                    ? "text-gray-900"
                    : isDone
                    ? "text-gray-700"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < CHECKOUT_STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className={`h-px w-6 sm:w-12 ${
                  isDone ? "bg-green-600" : "bg-gray-200"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}