#!/bin/sh
# Πρέπει να τρέχουν ήδη: docker compose up -d web nginx
# Το wedapp.gr να δείχνει (A record) στη δημόσια IP του server όπου ακούει η θύρα 80.
set -eu
EMAIL="${CERTBOT_EMAIL:?Ορίστε CERTBOT_EMAIL (π.χ. export CERTBOT_EMAIL=you@wedapp.gr)}"

docker compose run --rm --entrypoint "certbot" certbot certonly \
  --webroot \
  -w /var/www/certbot \
  -d wedapp.gr \
  -d main.wedapp.gr \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email

docker compose restart nginx
