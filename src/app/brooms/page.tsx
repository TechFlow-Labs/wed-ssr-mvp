import Image from "next/image";

type BroomProfile = {
  id: number;
  name: string;
  city: string;
  weddingDate: string;
  style: string;
  budget: string;
  bio: string;
  avatar: string;
};

const BROOMS: BroomProfile[] = [
  {
    id: 1,
    name: "Νίκος Παπαδόπουλος",
    city: "Αθήνα",
    weddingDate: "Ιούνιος 2026",
    style: "Modern Classic",
    budget: "€15.000 - €20.000",
    bio: "Αναζητά elegant αισθητική, live μπάντα και καθαρή χρωματική παλέτα για βραδινή δεξίωση.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    id: 2,
    name: "Γιώργος Ιωάννου",
    city: "Θεσσαλονίκη",
    weddingDate: "Σεπτέμβριος 2026",
    style: "Urban Romantic",
    budget: "€10.000 - €14.000",
    bio: "Θέλει city wedding με minimal διακόσμηση, φωτογραφικό corner και έμφαση στην εμπειρία καλεσμένων.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
  },
  {
    id: 3,
    name: "Μάριος Δημητρίου",
    city: "Πάτρα",
    weddingDate: "Μάιος 2027",
    style: "Boho Relaxed",
    budget: "€8.000 - €12.000",
    bio: "Προτιμά χαλαρή ατμόσφαιρα κοντά στη φύση, ξύλινες λεπτομέρειες και ανεπίσημο dinner setup.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    id: 4,
    name: "Στέφανος Κωνσταντίνου",
    city: "Ηράκλειο",
    weddingDate: "Αύγουστος 2026",
    style: "Formal Luxury",
    budget: "€20.000+",
    bio: "Σχεδιάζει επίσημο γάμο με signature cocktails, premium menu και υψηλή αισθητική στον φωτισμό.",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80",
  },
];

export const metadata = {
  title: "Brooms | Wed",
  description:
    "Mock προφίλ brooms για δοκιμές εμπειρίας περιήγησης και παρουσίασης στοιχείων γάμου.",
};

export default function BroomsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-100/40 to-transparent" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-light text-charcoal mb-4">
            Brooms
          </h1>
          <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
            Mock δεδομένα προφίλ brooms για έλεγχο διάταξης, περιεχομένου και
            εμπειρίας σελίδας.
          </p>
          <p className="mt-4 text-sm text-charcoal/60">
            {BROOMS.length} διαθέσιμα mock προφίλ
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {BROOMS.map((broom) => (
            <article
              key={broom.id}
              className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-stone-100">
                  <Image
                    src={broom.avatar}
                    alt={broom.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h2 className="font-display text-2xl text-charcoal">{broom.name}</h2>
                  <p className="text-sm text-charcoal/60">{broom.city}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-charcoal/80">
                  <span className="font-medium text-charcoal">Γάμος:</span>{" "}
                  {broom.weddingDate}
                </p>
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-charcoal/80">
                  <span className="font-medium text-charcoal">Στυλ:</span>{" "}
                  {broom.style}
                </p>
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-charcoal/80 sm:col-span-2">
                  <span className="font-medium text-charcoal">Budget:</span>{" "}
                  {broom.budget}
                </p>
              </div>

              <p className="mt-4 text-charcoal/80 leading-relaxed">{broom.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
