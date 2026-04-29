import Link from "next/link";
import Image from "next/image";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80";

const STATS = [
  { value: "1.200+", label: "Ζευγάρια" },
  { value: "350+", label: "Προμηθευτές" },
  { value: "48", label: "Τοποθεσίες" },
  { value: "4.9★", label: "Μέση βαθμολογία" },
];

const VENDORS = [
  {
    id: 1,
    name: "Villa Rosea",
    category: "Χώρος δεξίωσης",
    location: "Σαντορίνη",
    priceRange: "€€€",
    rating: 4.9,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
  },
  {
    id: 2,
    name: "Bloom & Co.",
    category: "Ανθοπωλείο",
    location: "Αθήνα",
    priceRange: "€€",
    rating: 4.8,
    reviews: 94,
    image:
      "https://images.unsplash.com/photo-1487530811015-780f382bb3d5?w=800&q=80",
  },
  {
    id: 3,
    name: "Moments Studio",
    category: "Φωτογραφία & Βίντεο",
    location: "Θεσσαλονίκη",
    priceRange: "€€",
    rating: 5.0,
    reviews: 211,
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
  },
  {
    id: 4,
    name: "Dolce Vita Catering",
    category: "Catering",
    location: "Αθήνα",
    priceRange: "€€€",
    rating: 4.7,
    reviews: 76,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    couple: "Μαρία & Νίκος",
    date: "Σεπτέμβριος 2024",
    location: "Μύκονος",
    quote:
      "Το wedapp έκανε τον σχεδιασμό του γάμου μας εύκολο και ευχάριστο. Βρήκαμε τον φωτογράφο, τον ανθοπωλείο και τον χώρο μέσα σε μια εβδομάδα!",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80",
  },
  {
    id: 2,
    couple: "Ελένη & Κώστας",
    date: "Ιούνιος 2024",
    location: "Αθήνα",
    quote:
      "Εντυπωσιαστήκαμε από την ποιότητα των προμηθευτών. Κάθε επιλογή ήταν επιμελημένη και οι αξιολογήσεις ήταν αξιόπιστες. Ο γάμος μας ήταν τέλειος.",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80",
  },
  {
    id: 3,
    couple: "Σοφία & Δημήτρης",
    date: "Μάιος 2025",
    location: "Σαντορίνη",
    quote:
      "Από την πρώτη στιγμή ένιωσα ότι έχω έναν οδηγό δίπλα μου. Τα εργαλεία σχεδιασμού με βοήθησαν να μην ξεχάσω τίποτα. Συνιστώ ανεπιφύλακτα!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Ζευγάρι σε γάμο"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/70" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-rose-200/10 blur-3xl" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="font-serif text-white/90 text-sm tracking-[0.3em] uppercase mb-4">
            Επιλεγμένα για τη μέρα σας
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-white tracking-tight mb-6 drop-shadow-lg">
            Ο γάμος σας,
            <br />
            <span className="text-rose-100 italic">οργανωμένος με ομορφιά</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-12 drop-shadow">
            Από τον σχεδιασμό μέχρι το «ναι» — βοηθάμε τα ζευγάρια να ζήσουν
            γάμους ομαλούς και χωρίς άγχος. Ξεκινήστε από τη νυφική μας
            συλλογή.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="hidden px-8 py-4 bg-charcoal text-white rounded-full font-medium hover:bg-charcoal/90 transition-colors"
            >
              Νυφική συλλογή
            </Link>
            <Link
              href="#services"
              className="px-8 py-4 border-2 border-white/80 text-white rounded-full font-medium hover:bg-white/10 hover:border-white transition-colors"
            >
              Οι υπηρεσίες μας
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-rose-700 py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl md:text-4xl mb-1">{s.value}</p>
              <p className="text-rose-200 text-sm tracking-wide uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="services"
        className="py-24 px-6 bg-white border-t border-charcoal/5"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-charcoal text-center mb-4">
            Όλα όσα χρειάζεστε
          </h2>
          <p className="text-charcoal/70 text-center max-w-2xl mx-auto mb-16">
            Σχεδιάστε τον γάμο των ονείρων σας με σιγουριά. Είμαστε δίπλα σας
            σε κάθε βήμα.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group flex flex-col rounded-2xl bg-rose-50/50 border border-rose-100/50 hover:border-rose-200/80 transition-colors overflow-hidden">
              <div className="relative w-full aspect-[16/10] shrink-0 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1764269714582-d994dfefb049?w=1200&q=80"
                  alt="Λευκά νυφικά παπούτσια, κοσμήματα και λουλούδια — νυφικά απαραίτητα"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center font-serif text-xl text-rose-600 shadow">
                  1
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-display text-xl text-charcoal mb-3">
                  Νυφικά απαραίτητα
                </h3>
                <p className="text-charcoal/70">
                  Φορέματα, παπούτσια, κοσμήματα και αξεσουάρ — όλα σε ένα
                  μέρος. Επιλεγμένα κομμάτια για τη σύγχρονη νύφη.
                </p>
                <Link
                  href="/shop"
                  className="inline-block mt-4 text-rose-600 font-medium hover:underline"
                >
                  Ξεκινήστε τις αγορές →
                </Link>
              </div>
            </div>
            <div className="group flex flex-col rounded-2xl bg-rose-50/50 border border-rose-100/50 hover:border-rose-200/80 transition-colors overflow-hidden">
              <div className="relative w-full aspect-[16/10] shrink-0 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1587287720754-94bac45f0bff?w=1200&q=80"
                  alt="Λίστα ελέγχου και σημειώσεις οργάνωσης γάμου σε χαρτί"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center font-serif text-xl text-rose-600 shadow">
                  2
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-display text-xl text-charcoal mb-3">
                  Εργαλεία σχεδιασμού
                </h3>
                <p className="text-charcoal/70">
                  Λίστες, χρονοδιαγράμματα και οδηγοί για να κρατάτε την
                  οργάνωση σε τάξη. Σύντομα διαθέσιμα.
                </p>
              </div>
            </div>
            <div className="group flex flex-col rounded-2xl bg-rose-50/50 border border-rose-100/50 hover:border-rose-200/80 transition-colors overflow-hidden">
              <div className="relative w-full aspect-[16/10] shrink-0 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80"
                  alt="Δεξίωση γάμου με στολισμένα τραπέζια και λουλούδια"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center font-serif text-xl text-rose-600 shadow">
                  3
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-display text-xl text-charcoal mb-3">
                  Κατάλογος προμηθευτών
                </h3>
                <p className="text-charcoal/70">
                  Συγκρίνετε διαθέσιμους προμηθευτές χώρων δεξιώσεων, με
                  χωρητικότητα, τιμές και βασικές λεπτομέρειες.
                </p>
                <Link
                  href="/vendors"
                  className="inline-block mt-4 text-rose-600 font-medium hover:underline"
                >
                  Περιήγηση προμηθευτών →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured vendors */}
      <section className="py-24 px-6 bg-stone-50 border-y border-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-serif text-rose-700 text-sm tracking-[0.3em] uppercase mb-2">
                Κορυφαίες επιλογές
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal">
                Προτεινόμενοι προμηθευτές
              </h2>
            </div>
            <Link
              href="/vendors"
              className="hidden md:inline-block text-rose-600 font-medium hover:underline"
            >
              Όλοι οι προμηθευτές →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENDORS.map((v) => (
              <div
                key={v.id}
                className="group bg-white rounded-2xl border border-stone-100 hover:border-rose-200 hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute top-3 right-3 bg-white/95 text-charcoal text-xs font-medium px-2 py-1 rounded-full shadow">
                    {v.priceRange}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-rose-600 font-medium uppercase tracking-wide mb-1">
                    {v.category}
                  </p>
                  <h3 className="font-display text-lg text-charcoal mb-1">{v.name}</h3>
                  <p className="text-charcoal/50 text-sm mb-3">{v.location}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-amber-400 text-sm">★</span>
                    <span className="text-charcoal font-medium text-sm">{v.rating.toFixed(1)}</span>
                    <span className="text-charcoal/40 text-sm">({v.reviews} κριτικές)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/vendors" className="text-rose-600 font-medium hover:underline">
              Όλοι οι προμηθευτές →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-rose-50/40 border-y border-rose-100/70">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-serif text-rose-700 text-sm tracking-[0.3em] uppercase mb-3">
              Γαμήλιες στιγμές
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
              Ιδέες για μια αξέχαστη ημέρα
            </h2>
            <p className="text-charcoal/70 max-w-3xl mx-auto">
              Ανακαλύψτε έμπνευση για τελετή, δεξίωση και προσωπικές πινελιές
              που θα κάνουν τον γάμο σας μοναδικό.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <article className="rounded-2xl bg-white p-7 border border-rose-100/80">
              <h3 className="font-display text-2xl text-charcoal mb-3">
                Τελετή με χαρακτήρα
              </h3>
              <p className="text-charcoal/75 leading-relaxed">
                Επιλέξτε μουσική εισόδου, διακόσμηση ανθοδέσμης και vows που
                αντικατοπτρίζουν την ιστορία σας ως ζευγάρι.
              </p>
            </article>
            <article className="rounded-2xl bg-white p-7 border border-rose-100/80">
              <h3 className="font-display text-2xl text-charcoal mb-3">
                Δεξίωση που ξεχωρίζει
              </h3>
              <p className="text-charcoal/75 leading-relaxed">
                Δημιουργήστε θεματικά τραπέζια, φωτισμό ατμόσφαιρας και menu με
                επιλογές που θα θυμούνται οι καλεσμένοι σας.
              </p>
            </article>
            <article className="rounded-2xl bg-white p-7 border border-rose-100/80">
              <h3 className="font-display text-2xl text-charcoal mb-3">
                Αναμνήσεις για πάντα
              </h3>
              <p className="text-charcoal/75 leading-relaxed">
                Σχεδιάστε photobooth γωνίες, guestbook εμπειρίες και timeline
                στιγμών για αυθεντικές φωτογραφίες και βίντεο.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-serif text-rose-700 text-sm tracking-[0.3em] uppercase mb-3">
              Ιστορίες ζευγαριών
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
              Τι λένε οι ζευγάρια μας
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="flex flex-col bg-rose-50/50 rounded-2xl border border-rose-100/60 p-8"
              >
                <p className="text-rose-400 text-3xl font-serif mb-4 leading-none">"</p>
                <p className="text-charcoal/80 leading-relaxed flex-1 mb-6">{t.quote}</p>
                <div className="flex items-center gap-4 pt-4 border-t border-rose-100">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.couple}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-display text-charcoal">{t.couple}</p>
                    <p className="text-charcoal/50 text-sm">
                      {t.date} · {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Έτοιμοι για το όνειρό σας;
          </h2>
          <p className="text-white/80 text-lg">
            Εξερευνήστε την επιλεγμένη νυφική μας συλλογή — νυφικά, παπούτσια,
            κοσμήματα, πέπλα και πολλά άλλα.
          </p>
        </div>
      </section>
    </main>
  );
}
