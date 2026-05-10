import { fetchGiftLists } from "@/lib/api";

export const metadata = {
  title: "Gift Lists | Wed",
  description: "Οργάνωσε τις λίστες δώρων σου με έτοιμες προτάσεις.",
};

export const dynamic = "force-dynamic";

export default async function GiftListsPage() {
  const { items, total } = await fetchGiftLists();

  return (
    <main className="min-h-screen bg-cream px-6 py-16">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif text-charcoal">Gift Lists</h1>
        <p className="mt-3 text-charcoal/75">
          Έτοιμες λίστες για να οργανώσεις τα δώρα σου ανά περίσταση.
        </p>
        <p className="mt-2 text-sm text-charcoal/60">Σύνολο λιστών: {total}</p>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-charcoal/10 bg-white p-10 text-center text-charcoal/70">
            Δεν υπάρχουν λίστες δώρων αυτή τη στιγμή.
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <article key={item.id} className="rounded-2xl border border-charcoal/10 bg-white p-6">
                <h2 className="font-display text-2xl text-charcoal">{item.title}</h2>
                <p className="mt-2 text-charcoal/75">{item.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-charcoal/60">
                  <span>Τύπος: {item.event_type}</span>
                  <span>{item.gift_count} δώρα</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
