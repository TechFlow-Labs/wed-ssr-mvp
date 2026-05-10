import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fetchGiftLists } from "@/lib/api";

export default async function GiftListsPage() {
  let data: Awaited<ReturnType<typeof fetchGiftLists>> | null = null;
  let error: string | null = null;

  try {
    data = await fetchGiftLists();
  } catch (err) {
    error = err instanceof Error ? err.message : "Κάτι πήγε λάθος";
  }

  return (
    <main className="min-h-screen bg-ivory">
      <Header />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl text-charcoal mb-2">Gift Lists</h1>
        <p className="text-charcoal/70 mb-10">Λίστες δώρων για τον γάμο σας.</p>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
            <p className="font-medium">Αποτυχία φόρτωσης</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {!error && (!data || data.items.length === 0) && (
          <div className="rounded-2xl border border-blush/60 bg-white p-8 text-center">
            <p className="font-medium text-charcoal">Δεν υπάρχουν διαθέσιμα δώρα</p>
            <p className="text-sm text-charcoal/70 mt-1">
              Μόλις προστεθούν δώρα, θα εμφανιστούν εδώ.
            </p>
          </div>
        )}

        {!error && data && data.items.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item) => (
              <article key={item.id} className="rounded-2xl bg-white border border-blush/40 overflow-hidden">
                <div className="relative h-44 bg-stone-100">
                  {item.main_image_url ? (
                    <Image
                      src={item.main_image_url}
                      alt={item.item_name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-charcoal/40 text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-rose mb-1">{item.category || "General"}</p>
                  <h2 className="font-display text-2xl text-charcoal">{item.item_name}</h2>
                  <p className="text-sm text-charcoal/70 mt-2">
                    {item.short_description || "Χωρίς σύντομη περιγραφή"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
