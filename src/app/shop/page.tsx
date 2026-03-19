import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";

export const metadata = {
  title: "Νυφικό κατάστημα | Wed",
  description:
    "Περιηγηθείτε στην επιλεγμένη συλλογή νυφικών ειδών — φορέματα, παπούτσια, κοσμήματα και άλλα.",
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-cream">
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-blush/20 to-transparent" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-light text-charcoal mb-4">
            Ό,τι ονειρεύεται μια νύφη
          </h1>
          <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
            Ανακαλύψτε την επιλεγμένη συλλογή νυφικών ειδών, από εντυπωσιακά
            φορέματα μέχρι τα πιο λεπτά αξεσουάρ.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <h2 className="text-2xl font-serif font-light text-charcoal text-center mb-12">
          Ανά κατηγορία
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className="group block"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden border border-charcoal/10 hover:border-blush/40 transition-all duration-300 bg-blush/30">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover opacity-90 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-serif font-medium text-white drop-shadow-lg">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/90 mt-1 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white/95 group-hover:gap-2 transition-all">
                    Εξερεύνηση
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
