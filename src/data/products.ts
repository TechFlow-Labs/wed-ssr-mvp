export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  featured?: boolean;
  image?: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Μινιμαλιστικό φόρεμα σατέν",
    description:
      "Καθαρές γραμμές και πολυτελές μετάξι σατέν για τη σύγχρονη νύφη.",
    price: 1800,
    category: "Νυφικά",
    inStock: true,
    image: "https://images.unsplash.com/photo-1594552072238-2bb1a2dde2b0?w=600&q=80",
  },
  {
    id: "2",
    name: "Μποέμ φόρεμα γραμμής Α",
    description:
      "Ρέον τούλι με λεπτά floral μοτίβα για έναν ρομαντικό γάμο σε κήπο.",
    price: 2400,
    category: "Νυφικά",
    inStock: true,
    image: "https://images.unsplash.com/photo-1584845028355-0c8b56e5d3e9?w=600&q=80",
  },
  {
    id: "3",
    name: "Νυφικό μπαλούν με δαντέλα",
    description:
      "Εντυπωσιακό μπαλούν με περίτεχνη δαντέλα και ουρά μήκους καθεδρικού.",
    price: 3200,
    category: "Νυφικά",
    inStock: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1574367157592-9c6c356ca210?w=600&q=80",
  },
  {
    id: "4",
    name: "Γόβες μεταξωτές ελεφαντόδοντου",
    description: "Κλασική κομψότητα με σύγχρονη σιλουέτα.",
    price: 280,
    category: "Παπούτσια",
    inStock: true,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
  },
  {
    id: "5",
    name: "Σανδάλια με κρύσταλλα",
    description: "Λαμπερά κρύσταλλα για τη μέγιστη νυφική λάμψη.",
    price: 420,
    category: "Παπούτσια",
    inStock: true,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
  },
  {
    id: "6",
    name: "Σκουλαρίκια με μαργαριτάρια",
    description: "Διαχρονικά σταγονωτά μαργαριτάρια με ασήμι 925.",
    price: 165,
    category: "Κοσμήματα",
    inStock: true,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
  },
  {
    id: "7",
    name: "Βραχιόλι τένις με διαμάντια",
    description: "Κομψή σειρά λεπτών διαμαντιών για τον καρπό σας.",
    price: 1890,
    category: "Κοσμήματα",
    inStock: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
  },
  {
    id: "8",
    name: "Πέπλο τούλι μήκους εκκλησίας",
    description: "Απαλό τούλι που φτάνει στα ακροδάχτυλα.",
    price: 195,
    category: "Πέπλα",
    inStock: true,
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
  },
  {
    id: "9",
    name: "Πέπλο δαντέλας μήκους καθεδρικού",
    description: "Δραματικό πέπλο με δαντελένιο τελείωμα για μεγαλειώδη είσοδο.",
    price: 450,
    category: "Πέπλα",
    inStock: true,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
  {
    id: "10",
    name: "Ζώνη νύφης σατέν",
    description: "Προσθέστε λάμψη σε οποιοδήποτε φόρεμα.",
    price: 85,
    category: "Αξεσουάρ",
    inStock: true,
    image: "https://images.unsplash.com/photo-1590846406588-f6b57906b423?w=600&q=80",
  },
  {
    id: "11",
    name: "Σετ ρόμπα μετάξι",
    description: "Πολυτελές μετάξι για τις στιγμές πριν το ντύσιμο.",
    price: 145,
    category: "Εσώρουχα",
    inStock: true,
    image: "https://images.unsplash.com/photo-1562322140-8ba492ce91f0?w=600&q=80",
  },
  {
    id: "12",
    name: "Χτένα μαλλιών με κρύσταλλα",
    description: "Λεπτή χτένα με κρύσταλλα για κομψά χτενίσματα.",
    price: 125,
    category: "Αξεσουάρ μαλλιών",
    inStock: true,
    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=600&q=80",
  },
  {
    id: "13",
    name: "Νυφικό μπουκέτο με τριαντάφυλλα",
    description: "Δεμένα στο χέρι τριαντάφυλλα κήπου σε απαλούς ροζ τόνους.",
    price: 180,
    category: "Μπουκέτα",
    inStock: true,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80",
  },
];

export type ProductFilters = {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price-asc" | "price-desc";
  inStockOnly?: boolean;
};

export function getProducts(filters: ProductFilters = {}): Product[] {
  let result = [...products];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (filters.category && filters.category !== "All") {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.minPrice != null) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice != null) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.inStockOnly) {
    result = result.filter((p) => p.inStock);
  }

  const sort = filters.sort ?? "newest";
  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);

  return result;
}
