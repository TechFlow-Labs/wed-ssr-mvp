#!/bin/sh
set -e
CERT="/etc/letsencrypt/live/wedapp.gr/fullchain.pem"
if [ -f "$CERT" ]; then
  cp /etc/nginx/templates/ssl.conf /etc/nginx/conf.d/default.conf
else
  cp /etc/nginx/templates/http-only.conf /etc/nginx/conf.d/default.conf
fi
# e.g. wedding-plan-nginx-prod:8050 (prod) or wedding-plan-nginx-local:8050 (local on same Docker network)
UPSTREAM="${WEDDING_API_NGINX_UPSTREAM:-wedding-plan-nginx-prod:8050}"
sed -i "s|__WEDDING_API_NGINX_UPSTREAM__|${UPSTREAM}|g" /etc/nginx/conf.d/default.conf
