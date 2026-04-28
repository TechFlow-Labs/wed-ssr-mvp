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
| `/wikipedia` | Wikipedia για γάμους (οδηγοί και βασικά θέματα) |

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

# Εκτέλεση (API στο host, πρόσβαση από browser στο localhost:8060)
docker run --rm -p 3000:3000 \
  --add-host=host.docker.internal:host-gateway \
  -e API_INTERNAL_URL=http://host.docker.internal:8060 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8060 \
  wedding-planner
```

Με Compose (προαιρετικά `.env` δίπλα στο `docker-compose.yml`):

```bash
docker compose up --build
```

- **`API_INTERNAL_URL`** — χρησιμοποιείται μόνο από τον **Node server** (SSR, `fetch` στο container) για να φτάσει το API που τρέχει στο **host**. Το `localhost` μέσα στο container δεν είναι το μηχάνημά σας.
- **`NEXT_PUBLIC_API_URL`** — διεύθυνση που βλέπει ο **browser** (π.χ. αιτήματα από τη φόρμα)· όταν ανοίγεις `http://localhost:3000`, συνήθως το API είναι `http://localhost:8060`.

Αν το API είναι άλλο container στο ίδιο compose, βάλε π.χ. `API_INTERNAL_URL=http://api:8060` (όνομα υπηρεσίας) και `NEXT_PUBLIC_API_URL` όπως πρέπει να το βλέπει ο χρήστης από έξω.

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

5. **Παραγωγή:** ορίστε `NEXT_PUBLIC_API_URL` στη δημόσια URL του API (π.χ. `https://api.wedapp.gr`) ώστε ο browser και τα client bundles να χτυπάνε το σωστό host.

Για δοκιμές χωρίς nginx, ξεσχολιάστε στο `docker-compose.yml` το `ports: "3000:3000"` της υπηρεσίας `web`.

**Σημείωση:** Τα αρχεία στο `nginx/templates/` χρησιμοποιούν `server_name wedapp.gr`. Για `www.wedapp.gr`, προσθέστε το στα `server_name`, στο `ssl_certificate` paths (αν χρησιμοποιείτε ξεχωριστό live directory) και στο `certonly` με επιπλέον `-d www.wedapp.gr`.
