export const categories = [
  {
    id: "wedding-dresses",
    name: "Νυφικά",
    slug: "wedding-dresses",
    description: "Βρείτε το φόρεμα των ονείρων σας",
    shortDescription: "Βρείτε το φόρεμα των ονείρων σας",
    image: "https://images.unsplash.com/photo-1594552072238-2bb1a2dde2b0?w=800&q=80",
  },
  {
    id: "shoes",
    name: "Παπούτσια",
    slug: "shoes",
    description: "Βαδίστε στον διάδρομο με στυλ",
    shortDescription: "Βαδίστε στον διάδρομο με στυλ",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
  },
  {
    id: "jewelry",
    name: "Κοσμήματα",
    slug: "jewelry",
    description: "Λάμψτε τη μεγάλη σας μέρα",
    shortDescription: "Λάμψτε τη μεγάλη σας μέρα",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
  },
  {
    id: "veils",
    name: "Πέπλα",
    slug: "veils",
    description: "Η τέλεια τελική πινελιά",
    shortDescription: "Η τέλεια τελική πινελιά",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
  },
  {
    id: "accessories",
    name: "Αξεσουάρ",
    slug: "accessories",
    description: "Ολοκληρώστε το νυφικό σας στυλ",
    shortDescription: "Ολοκληρώστε το νυφικό σας στυλ",
    image: "https://images.unsplash.com/photo-1590846406588-f6b57906b423?w=800&q=80",
  },
  {
    id: "lingerie",
    name: "Εσώρουχα",
    slug: "lingerie",
    description: "Κομψά εσώρουχα",
    shortDescription: "Κομψά εσώρουχα",
    image: "https://images.unsplash.com/photo-1562322140-8ba492ce91f0?w=800&q=80",
  },
  {
    id: "hair-accessories",
    name: "Αξεσουάρ μαλλιών",
    slug: "hair-accessories",
    description: "Στεφανώστε την ομορφιά σας",
    shortDescription: "Στεφανώστε την ομορφιά σας",
    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=800&q=80",
  },
  {
    id: "bouquets",
    name: "Μπουκέτα",
    slug: "bouquets",
    description: "Ανθοδέσμες για τη στιγμή σας",
    shortDescription: "Ανθοδέσμες για τη στιγμή σας",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export function slugToName(slug: string): string {
  const category = categories.find((c) => c.slug === slug);
  return category?.name ?? slug.replace(/-/g, " ");
}
