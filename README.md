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

## Docker

Η εφαρμογή χτίζεται ως **production image** (Next.js `standalone`) και τρέχει στη θύρα **3000**.

```bash
# Εικόνα
docker build -t wedding-planner .

# Εκτέλεση
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://host.docker.internal:8060 \
  wedding-planner
```

Με Compose (ίδιες μεταβλητές περιβάλλοντος· προαιρετικά `.env` δίπλα στο `docker-compose.yml`):

```bash
NEXT_PUBLIC_API_URL=http://host.docker.internal:8060 docker compose up --build
```

Το `NEXT_PUBLIC_API_URL` είναι η διεύθυνση που βλέπει ο **browser** (και ο server για SSR) για το backend· μέσα στο container το `localhost` δείχνει στο ίδιο το container, όχι στο μηχάνημά σας — γι’ αυτό σε Mac/Windows χρησιμοποιείται συχνά `host.docker.internal` για API που τρέχει στο host.
