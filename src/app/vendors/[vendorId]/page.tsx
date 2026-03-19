import Link from "next/link";
import { notFound } from "next/navigation";
import { VendorContactForm } from "@/components/VendorContactForm";
import { fetchVendors } from "@/lib/api";

type VendorProfilePageProps = {
  params: {
    vendorId: string;
  };
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: VendorProfilePageProps) {
  const { items } = await fetchVendors(100);
  const vendor = items.find((v) => v.partner_id === params.vendorId);

  if (!vendor) {
    return { title: "Ο προμηθευτής δεν βρέθηκε | Wed" };
  }

  return {
    title: `${vendor.business_name} | Wed`,
    description: `Λεπτομέρειες για ${vendor.business_name} και αίτημα κράτησης.`,
  };
}

export default async function VendorProfilePage({
  params,
}: VendorProfilePageProps) {
  const { items } = await fetchVendors(100);
  const vendor = items.find((v) => v.partner_id === params.vendorId);

  if (!vendor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream">
      <section className="relative overflow-hidden py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-blush/20 to-transparent" />
        <div className="relative max-w-6xl mx-auto">
          <Link
            href="/vendors"
            className="inline-flex items-center text-sm text-charcoal/70 hover:text-charcoal"
          >
            ← Όλοι οι προμηθευτές
          </Link>

          <div className="mt-6 rounded-2xl border border-charcoal/10 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl text-charcoal">
                  {vendor.business_name}
                </h1>
                {vendor.category && (
                  <span className="mt-2 inline-block rounded-full bg-rose-100 text-rose-800 px-3 py-1 text-sm font-medium">
                    {vendor.category}
                  </span>
                )}
              </div>
            </div>

            {vendor.description && (
              <p className="mt-5 text-charcoal/80">{vendor.description}</p>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <VendorContactForm
            partnerId={vendor.partner_id}
            vendorName={vendor.business_name}
          />
        </div>
      </section>
    </main>
  );
}
