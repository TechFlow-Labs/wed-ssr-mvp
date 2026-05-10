"use client";

export default function SpecialPartnersError() {
  return (
    <main className="min-h-screen bg-cream px-6 py-24">
      <div className="max-w-4xl mx-auto text-center bg-white border border-red-200 rounded-2xl p-10">
        <h1 className="text-3xl font-display text-charcoal">Special Partners</h1>
        <p className="mt-4 text-red-700">
          Δεν ήταν δυνατή η φόρτωση των συνεργατών. Δοκιμάστε ξανά σε λίγο.
        </p>
      </div>
    </main>
  );
}
