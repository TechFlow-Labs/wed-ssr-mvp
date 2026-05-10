"use client";

type GiftListsErrorProps = {
  error: Error;
  reset: () => void;
};

export default function GiftListsError({ error, reset }: GiftListsErrorProps) {
  return (
    <main className="min-h-screen bg-cream px-6 py-16">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif text-charcoal">Gift Lists</h1>
        <div className="mt-8 rounded-2xl border border-red-200 bg-white p-8 text-center">
          <p className="text-red-700 font-medium">
            Δεν ήταν δυνατή η φόρτωση των λιστών δώρων.
          </p>
          <p className="mt-2 text-sm text-charcoal/65">{error.message}</p>
          <button
            onClick={reset}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-charcoal px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Δοκιμή ξανά
          </button>
        </div>
      </section>
    </main>
  );
}
