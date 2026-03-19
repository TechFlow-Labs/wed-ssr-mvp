# Wed — Οργάνωση γάμου & νυφικό κατάστημα

Ιστότοπος Next.js (SSR) που βοηθά ζευγάρια να οργανώσουν τον γάμο τους, με έμφαση σε νυφικά είδη. Το περιβάλλον χρήστη είναι στα **ελληνικά**· το σήμα είναι **Wed**. Οι συνδέσμους πλοήγησης «Shop» έχουμε αποκρύψει (κλάση `hidden`) χωρίς να αφαιρέσουμε τις διαδρομές `/shop`.

## Χαρακτηριστικά

- **Αρχική σελίδα** — Εισαγωγή και επισκόπηση υπηρεσιών
- **Κατηγορίες καταστήματος** — Πλακίδια (νυφικά, παπούτσια, κοσμήματα, πέπλα, αξεσουάρ, εσώρουχα, μαλλιά, μπουκέτα)
- **Ηλεκτρονικό κατάστημα** — Πλέγμα προϊόντων με φίλτρα (αναζήτηση, κατηγορία, τιμή, ταξινόμηση, διαθεσιμότητα)
- **SSR** — Απόδοση στον διακομιστή

## Τεχνολογίες

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Γραμματοσειρές Cormorant Garamond + Jost

## Εγκατάσταση

```bash
cd wedding-planner
npm install
npm run dev
```

Άνοιγμα [http://localhost:3000](http://localhost:3000).

## Διαδρομές

| Διαδρομή | Περιγραφή |
|----------|-----------|
| `/` | Αρχική |
| `/shop` | Πλακίδια κατηγοριών |
| `/shop/[category]` | Προϊόντα ανά κατηγορία (π.χ. `/shop/wedding-dresses`) |
| `/vendors` | Κατάλογος προμηθευτών |

## Δομή έργου

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── shop/
│   └── vendors/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ShopFilters.tsx
│   ├── ProductGrid.tsx
│   ├── ProductCard.tsx
│   └── VendorContactForm.tsx
└── data/
    ├── categories.ts
    └── products.ts
```

## Build

```bash
npm run build
npm start
```
