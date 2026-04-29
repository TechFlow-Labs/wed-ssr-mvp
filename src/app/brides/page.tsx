import Image from "next/image";

type BrideProfile = {
  id: number;
  name: string;
  city: string;
  weddingDate: string;
  style: string;
  budget: string;
  bio: string;
  avatar: string;
};

const BRIDES: BrideProfile[] = [
  {
    id: 1,
    name: "Άννα Παπαδοπούλου",
    city: "Αθήνα",
    weddingDate: "Ιούνιος 2026",
    style: "Minimal Chic",
    budget: "€15.000 - €20.000",
    bio: "Αναζητά καθαρές γραμμές, λευκά άνθη και κομψή δεξίωση με θέα στη θάλασσα.",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
  },
  {
    id: 2,
    name: "Κατερίνα Ιωάννου",
    city: "Θεσσαλονίκη",
    weddingDate: "Σεπτέμβριος 2026",
    style: "Romantic Garden",
    budget: "€10.000 - €14.000",
    bio: "Ονειρεύεται υπαίθρια τελετή με φυσικά υλικά, παστέλ παλέτα και live μουσική.",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
  },
  {
    id: 3,
    name: "Σοφία Δημητρίου",
    city: "Πάτρα",
    weddingDate: "Μάιος 2027",
    style: "Boho Elegant",
    budget: "€8.000 - €12.000",
    bio: "Θέλει χαλαρή ατμόσφαιρα με rustic στοιχεία, ξύλινα τραπέζια και έντονο πράσινο.",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&q=80",
  },
  {
    id: 4,
    name: "Μαρία Κωνσταντίνου",
    city: "Ηράκλειο",
    weddingDate: "Αύγουστος 2026",
    style: "Classic Luxury",
    budget: "€20.000+",
    bio: "Προτιμά επίσημη δεξίωση με χρυσές λεπτομέρειες, μεγάλο ανθοστολισμό και piano set.",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
  },
];

export const metadata = {
  title: "Νύφες | Wed",
  description:
    "Mock προφίλ νυφών για δοκιμές εμπειρίας περιήγησης και παρουσίασης στοιχείων γάμου.",
};

export default function BridesPage() {
  return (
    <main className="min-h-screen bg-cream">
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-100/40 to-transparent" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-light text-charcoal mb-4">
            Νύφες
          </h1>
          <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
            Mock δεδομένα προφίλ νυφών για έλεγχο διάταξης, περιεχομένου και
            εμπειρίας σελίδας.
          </p>
          <p className="mt-4 text-sm text-charcoal/60">
            {BRIDES.length} διαθέσιμα mock προφίλ
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {BRIDES.map((bride) => (
            <article
              key={bride.id}
              className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-stone-100">
                  <Image
                    src={bride.avatar}
                    alt={bride.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h2 className="font-display text-2xl text-charcoal">{bride.name}</h2>
                  <p className="text-sm text-charcoal/60">{bride.city}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-charcoal/80">
                  <span className="font-medium text-charcoal">Γάμος:</span>{" "}
                  {bride.weddingDate}
                </p>
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-charcoal/80">
                  <span className="font-medium text-charcoal">Στυλ:</span>{" "}
                  {bride.style}
                </p>
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-charcoal/80 sm:col-span-2">
                  <span className="font-medium text-charcoal">Budget:</span>{" "}
                  {bride.budget}
                </p>
              </div>

              <p className="mt-4 text-charcoal/80 leading-relaxed">{bride.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
