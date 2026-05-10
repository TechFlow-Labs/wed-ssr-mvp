import Image from "next/image";
import Link from "next/link";
import { fetchSpecialPartners } from "@/lib/api";

export const metadata = {
  title: "Special Partners | Wed",
  description: "Επιλεγμένοι συνεργάτες για τη μέρα του γάμου σας.",
};

export const dynamic = "force-dynamic";

export default async function SpecialPartnersPage() {
  const { items } = await fetchSpecialPartners();

  return (
    <main className="min-h-screen bg-cream">
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-blush/20 to-transparent" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-light text-charcoal mb-4">
            Special Partners
          </h1>
          <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
            Επιλεγμένοι συνεργάτες με premium υπηρεσίες για μια ξεχωριστή εμπειρία γάμου.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((partner) => (
            <article
              key={partner.id}
              className="rounded-2xl border border-charcoal/10 bg-white shadow-sm overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={partner.featuredImage}
                  alt={partner.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-2xl text-charcoal">{partner.name}</h2>
                  <span className="rounded-full bg-rose-100 text-rose-800 px-3 py-0.5 text-xs font-medium">
                    {partner.badge}
                  </span>
                </div>
                <p className="mt-2 text-sm text-charcoal/70">
                  {partner.category} · {partner.city}
                </p>
                <p className="mt-4 text-charcoal/80 line-clamp-3">{partner.shortDescription}</p>
                <p className="mt-4 text-sm font-medium text-rose-700">
                  Βαθμολογία: {partner.rating.toFixed(1)} / 5
                </p>
              </div>
            </article>
          ))}
        </div>

        {items.length === 0 && (
          <div className="max-w-4xl mx-auto text-center bg-white border border-charcoal/10 rounded-2xl p-12">
            <p className="text-charcoal/70">Δεν υπάρχουν special partners αυτή τη στιγμή.</p>
          </div>
        )}

        <div className="max-w-6xl mx-auto mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-full border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-white transition-colors"
          >
            Επιστροφή στην αρχική
          </Link>
        </div>
      </section>
    </main>
  );
}
