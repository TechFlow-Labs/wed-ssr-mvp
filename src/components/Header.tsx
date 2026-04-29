import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-blush/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-medium text-charcoal hover:text-rose transition-colors"
        >
          Wed
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-charcoal/80 hover:text-charcoal transition-colors"
          >
            Αρχική
          </Link>
          <Link
            href="/shop"
            className="hidden text-sm font-medium text-charcoal/80 hover:text-charcoal transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/vendors"
            className="text-sm font-medium text-charcoal/80 hover:text-charcoal transition-colors"
          >
            Προμηθευτές
          </Link>
          <Link
            href="/brooms"
            className="text-sm font-medium text-charcoal/80 hover:text-charcoal transition-colors"
          >
            Brooms
          </Link>
          <a
            href="https://main.wedapp.gr"
            className="inline-flex items-center justify-center rounded-md border border-rose-400/50 bg-champagne/80 px-4 py-1.5 text-sm font-medium text-charcoal hover:border-rose-600 hover:bg-champagne transition-colors"
          >
            Σύνδεση
          </a>
        </div>
      </nav>
    </header>
  );
}
