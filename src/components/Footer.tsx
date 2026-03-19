import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-blush/50 bg-champagne/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link
            href="/"
            className="font-serif text-xl font-medium text-charcoal hover:text-rose transition-colors"
          >
            Wed
          </Link>
          <p className="text-sm text-charcoal/70">
            Επιλεγμένα για τη μέρα σας. Βοηθάμε τα ζευγάρια να οργανώσουν τον
            τέλειο γάμο.
          </p>
        </div>
        <div className="mt-8 pt-8 border-t border-blush/50 flex justify-center gap-6">
          <Link
            href="/"
            className="text-sm text-charcoal/60 hover:text-charcoal transition-colors"
          >
            Αρχική
          </Link>
          <Link
            href="/shop"
            className="hidden text-sm text-charcoal/60 hover:text-charcoal transition-colors"
          >
            Shop
          </Link>
        </div>
      </div>
    </footer>
  );
}
