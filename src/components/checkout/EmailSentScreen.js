export default function EmailSentScreen({ contact, quote, negotiation }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:p-8">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
        📧
      </div>
      <h2 className="font-display text-xl font-black text-gray-900">
        Quotation sent to your email
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        We&apos;ve emailed the quotation (highest of the price range) to{" "}
        <b className="text-gray-800">{contact?.email}</b>
        {quote?.ccEmails?.length > 0 && (
          <>
            {" "}and {quote.ccEmails.length} other{quote.ccEmails.length > 1 ? "s" : ""}
          </>
        )}
        .
      </p>
      {quote?.quoteId && (
        <p className="mt-2 text-xs text-gray-400">
          Quotation ID: <span className="font-mono">{quote.quoteId}</span> ·{" "}
          Valid till{" "}
          {new Date(quote.validTill).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </p>
      )}
      {negotiation && (
        <p className="mt-4 rounded-lg bg-orange-50 px-3 py-2 text-xs text-orange-800">
          A negotiation specialist is being connected. Please keep this window
          open.
        </p>
      )}
    </div>
  );
}