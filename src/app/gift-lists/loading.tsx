export default function GiftListsLoading() {
  return (
    <main className="min-h-screen bg-cream px-6 py-16">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif text-charcoal">Gift Lists</h1>
        <p className="mt-3 text-charcoal/75">Φόρτωση λιστών δώρων...</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-charcoal/10 bg-white p-6 animate-pulse"
            >
              <div className="h-6 w-2/3 rounded bg-charcoal/10" />
              <div className="mt-3 h-4 w-full rounded bg-charcoal/10" />
              <div className="mt-2 h-4 w-5/6 rounded bg-charcoal/10" />
              <div className="mt-6 h-4 w-1/2 rounded bg-charcoal/10" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
