import Link from "next/link";
import { fetchVendors } from "@/lib/api";

export const metadata = {
  title: "Προμηθευτές γάμου | Wed",
  description:
    "Περιηγηθείτε σε χώρους δεξιώσεων και ανακαλύψτε τιμές, χωρητικότητα και λεπτομέρειες υπηρεσιών.",
};

export const dynamic = "force-dynamic";

export default async function VendorsPage() {
  const { items: vendors, total } = await fetchVendors();

  const vendorLabel =
    total === 1
      ? "1 διαθέσιμος προμηθευτής"
      : `${total} διαθέσιμοι προμηθευτές`;

  return (
    <main className="min-h-screen bg-cream">
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-blush/20 to-transparent" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-light text-charcoal mb-4">
            Προμηθευτές γάμου
          </h1>
          <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
            Εξερευνήστε διαθέσιμους προμηθευτές και στείλτε αιτήματα κράτησης
            απευθείας σε όσους ταιριάζουν στο όραμά σας.
          </p>
          <p className="mt-4 text-sm text-charcoal/60">{vendorLabel}</p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {vendors.map((vendor) => (
            <Link
              key={vendor.partner_id}
              href={`/vendors/${vendor.partner_id}`}
              className="group rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm hover:border-rose-300 hover:shadow-md transition-all"
            >
              <article>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl text-charcoal">
                      {vendor.business_name}
                    </h2>
                    {vendor.category && (
                      <span className="mt-1 inline-block rounded-full bg-rose-100 text-rose-800 px-3 py-0.5 text-xs font-medium">
                        {vendor.category}
                      </span>
                    )}
                  </div>
                </div>

                {vendor.description && (
                  <p className="mt-4 text-charcoal/80 line-clamp-3">
                    {vendor.description}
                  </p>
                )}

                <p className="mt-5 inline-flex items-center text-sm font-medium text-rose-700 group-hover:underline">
                  Προφίλ και αίτημα κράτησης →
                </p>
              </article>
            </Link>
          ))}

          {vendors.length === 0 && (
            <p className="col-span-2 text-center text-charcoal/60 py-12">
              Δεν υπάρχουν διαθέσιμοι προμηθευτές αυτή τη στιγμή. Δοκιμάστε ξανά
              σύντομα.
            </p>
          )}
        </div>

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
