import type { Metadata } from "next";

const WEDDING_TOPICS = [
  {
    title: "Πολιτικός ή Θρησκευτικός Γάμος",
    description:
      "Κατανοήστε τις διαφορές, τα δικαιολογητικά και τα βήματα για κάθε επιλογή ώστε να αποφασίσετε τι ταιριάζει καλύτερα στο ζευγάρι σας.",
  },
  {
    title: "Χρονοδιάγραμμα Οργάνωσης",
    description:
      "Από 12 μήνες πριν έως την ημέρα του γάμου, δείτε πότε πρέπει να κλείσετε χώρο, φωτογράφο, νυφικό και υπόλοιπους προμηθευτές.",
  },
  {
    title: "Budget και Προτεραιότητες",
    description:
      "Μοιράστε σωστά το budget ανά κατηγορία (χώρος, catering, μουσική, ένδυση) και αποφύγετε συνηθισμένα οικονομικά λάθη.",
  },
  {
    title: "Εθιμοτυπία και Παράδοση",
    description:
      "Οδηγός για προσκλήσεις, RSVP, seating plan, κουμπάρους και ελληνικά έθιμα ώστε να οργανώσετε μια ομαλή εμπειρία για όλους.",
  },
  {
    title: "Νυφικό Στυλ και Ομορφιά",
    description:
      "Συνδυάστε νυφικό, παπούτσια, πέπλο, αξεσουάρ και makeup με βάση την εποχή, τον χώρο και το προσωπικό σας ύφος.",
  },
  {
    title: "Ημέρα Γάμου Χωρίς Άγχος",
    description:
      "Πρακτικά checklists τελευταίας εβδομάδας, πλάνο έκτακτης ανάγκης και συμβουλές συντονισμού για να απολαύσετε τη μέρα σας.",
  },
];

export const metadata: Metadata = {
  title: "Wikipedia Γάμου | Wed",
  description:
    "Η wedding wikipedia του Wed με βασικούς οδηγούς για οργάνωση γάμου, budget, εθιμοτυπία, νυφικό στυλ και προετοιμασία ημέρας.",
};

export default function WeddingWikipediaPage() {
  return (
    <main className="bg-white">
      <section className="px-6 pt-20 pb-12 border-b border-charcoal/10 bg-rose-50/40">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-serif text-sm tracking-[0.2em] uppercase text-rose-700/80 mb-3">
            Wed Guides
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-charcoal mb-4">
            Wikipedia για Γάμους
          </h1>
          <p className="text-charcoal/70 text-lg max-w-3xl mx-auto">
            Ένας πρακτικός οδηγός γνώσης για ζευγάρια που οργανώνουν τον γάμο
            τους. Βρείτε συγκεντρωμένα βασικά θέματα, tips και σημεία προσοχής.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WEDDING_TOPICS.map((topic) => (
            <article
              key={topic.title}
              className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm hover:border-rose-200 transition-colors"
            >
              <h2 className="font-display text-2xl text-charcoal mb-3">
                {topic.title}
              </h2>
              <p className="text-charcoal/75 leading-relaxed">
                {topic.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
