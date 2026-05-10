"use client";

export default function GiftListsError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-cream px-6 py-16">
      <div className="max-w-5xl mx-auto rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p>Προέκυψε σφάλμα κατά τη φόρτωση λιστών δώρων.</p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-4 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
        >
          Προσπάθησε ξανά
        </button>
      </div>
    </main>
  );
}
