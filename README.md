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

Άνοιγμα [http://localhost:3005](http://localhost:3005).

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

Η εφαρμογή χτίζεται ως **production image** (Next.js `standalone`) και τρέχει στη θύρα **3005**.

```bash
# Εικόνα
docker build -t wedding-planner .

# Εκτέλεση (API στο host, browser calls μέσω /public-api)
docker run --rm -p 3005:3005 \
  --add-host=host.docker.internal:host-gateway \
  -e API_INTERNAL_URL=http://host.docker.internal:8060 \
  wedding-planner
```

Με Compose (προαιρετικά `.env` δίπλα στο `docker-compose.yml`):

```bash
docker compose up --build
```

- **`API_INTERNAL_URL`** — χρησιμοποιείται από τον **Node server** (SSR) για να φτάσει το API. Σε Docker βάλε συνήθως `http://host.docker.internal:8060`, ενώ χωρίς Docker `http://localhost:8060`.
- **Browser requests** — γίνονται πάντα σε **same-origin** path: `/public-api/...` και προωθούνται από Next rewrite στο backend target.
- **`NEXT_PUBLIC_API_URL`** — προαιρετικό fallback για SSR μόνο (όχι για browser calls στο default setup).

Αν το API είναι άλλο container στο ίδιο compose, βάλε π.χ. `API_INTERNAL_URL=http://api:8060` (όνομα υπηρεσίας).

### API Routing Rule (same-origin proxy)

Ο browser καλεί πάντα:

- `/public-api/vendors/?limit=50&skip=0`
- `/public-api/reservations/guest`

Το Next.js rewrite (`next.config.js`) προωθεί τα αιτήματα στο:

- `API_PROXY_TARGET` ή
- `API_INTERNAL_URL` ή
- `http://localhost:8060` (fallback)

### Nginx reverse proxy + SSL (wedapp.gr)

Το `docker-compose.yml` περιλαμβάνει τρεις υπηρεσίες: **`web`** (Next.js), **`nginx`** (reverse proxy στις 80/443) και **`certbot`** (ανανέωση πιστοποιητικών Let’s Encrypt).

1. **DNS:** A record το `wedapp.gr` → δημόσια IP του server (όπου ακούουν οι θύρες 80 και 443).
2. **Εκκίνηση:** `docker compose up -d --build`
3. **Πρώτο πιστοποιητικό** (nginx πρέπει να τρέχει ώστε το HTTP challenge να σερβίρεται από `/var/www/certbot`):

   ```bash
   export CERTBOT_EMAIL=you@wedapp.gr
   ./scripts/issue-ssl-cert.sh
   ```

   Ή χειροκίνητα:

   ```bash
   docker compose run --rm certbot certonly --webroot -w /var/www/certbot \
     -d wedapp.gr --email you@wedapp.gr --agree-tos --no-eff-email
   docker compose restart nginx
   ```

   Μετά το restart, το entrypoint του nginx ανιχνεύει τα αρχεία σε `/etc/letsencrypt/live/wedapp.gr/` και ενεργοποιεί HTTPS + ανακατεύθυνση HTTP→HTTPS.

4. **Ανανέωση SSL:** το container `certbot` τρέχει `certbot renew` περιοδικά. Μετά από επιτυχημένη ανανέωση, φορτώστε ξανά το nginx ώστε να διαβάσει τα νέα αρχεία:

   ```bash
   docker compose exec nginx nginx -s reload
   ```

5. **Παραγωγή:** ορίστε `API_INTERNAL_URL` στο εσωτερικό/upstream backend target πίσω από nginx (ή στο private API DNS που βλέπει ο Next server). Τα browser calls παραμένουν σε `/public-api`.

### Σημείωση CORS

Με same-origin proxy mode, τα browser calls περνάνε από το ίδιο origin και συνήθως δεν χρειάζονται πρόσθετες CORS αλλαγές.
Αν γίνουν direct browser calls σε API domain, ενημερώστε το backend CORS allowlist (στο `wed-backend/src/app/app.py`) ώστε να περιλαμβάνει τουλάχιστον `http://localhost:3005` και τα production frontend domains.

Για δοκιμές χωρίς nginx, ξεσχολιάστε στο `docker-compose.yml` το `ports: "3005:3005"` της υπηρεσίας `web`.

**Σημείωση:** Τα αρχεία στο `nginx/templates/` χρησιμοποιούν `server_name wedapp.gr`. Για `www.wedapp.gr`, προσθέστε το στα `server_name`, στο `ssl_certificate` paths (αν χρησιμοποιείτε ξεχωριστό live directory) και στο `certonly` με επιπλέον `-d www.wedapp.gr`.
