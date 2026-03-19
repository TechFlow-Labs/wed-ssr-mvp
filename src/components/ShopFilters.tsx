"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type ShopFiltersProps = {
  currentCategory: string;
  categories: string[];
  defaultSearch?: string;
  defaultMinPrice?: number;
  defaultMaxPrice?: number;
  defaultSort?: string;
  defaultInStock?: boolean;
};

export default function ShopFilters({
  currentCategory,
  categories,
  defaultSearch = "",
  defaultMinPrice,
  defaultMaxPrice,
  defaultSort = "newest",
  defaultInStock = false,
}: ShopFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "") params.delete(key);
        else params.set(key, value);
      });
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const search =
      (form.elements.namedItem("search") as HTMLInputElement)?.value ?? "";
    updateParams({ search: search || undefined });
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-serif font-medium text-charcoal">Φίλτρα</h2>

      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-charcoal/80 mb-1"
          >
            Αναζήτηση
          </label>
          <input
            id="search"
            name="search"
            type="text"
            defaultValue={defaultSearch}
            placeholder="Αναζήτηση προϊόντων…"
            className="w-full px-3 py-2 rounded-lg border border-charcoal/20 bg-white text-charcoal placeholder:text-charcoal/50 focus:outline-none focus:ring-2 focus:ring-blush/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-2">
            Κατηγορία
          </label>
          <select
            value={currentCategory}
            onChange={(e) => updateParams({ category: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-blush/30"
          >
            <option value="All">Όλα</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-2">
            Εύρος τιμής (€)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="0"
              defaultValue={defaultMinPrice}
              min={0}
              onBlur={(e) => {
                const v = e.target.value;
                updateParams({ minPrice: v ? v : undefined });
              }}
              className="w-full px-3 py-2 rounded-lg border border-charcoal/20 bg-white text-charcoal placeholder:text-charcoal/50 focus:outline-none focus:ring-2 focus:ring-blush/30"
            />
            <span className="self-center text-charcoal/60">—</span>
            <input
              type="number"
              placeholder="Έως 10.000"
              defaultValue={defaultMaxPrice}
              min={0}
              onBlur={(e) => {
                const v = e.target.value;
                updateParams({ maxPrice: v ? v : undefined });
              }}
              className="w-full px-3 py-2 rounded-lg border border-charcoal/20 bg-white text-charcoal placeholder:text-charcoal/50 focus:outline-none focus:ring-2 focus:ring-blush/30"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-2">
            Ταξινόμηση
          </label>
          <select
            value={defaultSort}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-blush/30"
          >
            <option value="newest">Νεότερα</option>
            <option value="price-asc">Τιμή: χαμηλή → υψηλή</option>
            <option value="price-desc">Τιμή: υψηλή → χαμηλή</option>
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={defaultInStock}
            onChange={(e) =>
              updateParams({ inStock: e.target.checked ? "true" : undefined })
            }
            className="rounded border-charcoal/30 text-blush focus:ring-blush/30"
          />
          <span className="text-sm text-charcoal/80">Μόνο διαθέσιμα</span>
        </label>

        <button
          type="button"
          onClick={clearFilters}
          className="w-full py-2 text-sm font-medium text-charcoal/70 hover:text-charcoal border border-charcoal/20 rounded-lg hover:bg-charcoal/5 transition-colors"
        >
          Καθαρισμός φίλτρων
        </button>

        <button
          type="submit"
          className="w-full py-2 text-sm font-medium text-white bg-charcoal hover:bg-charcoal/90 rounded-lg transition-colors"
        >
          Εφαρμογή
        </button>
      </form>
    </div>
  );
}
