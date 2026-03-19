import Link from "next/link";
import Image from "next/image";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80";

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
