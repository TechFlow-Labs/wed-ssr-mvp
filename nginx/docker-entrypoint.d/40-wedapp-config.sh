#!/bin/sh
set -e
CERT="/etc/letsencrypt/live/wedapp.gr/fullchain.pem"
PREVIEW="${PREVIEW_MODE:-false}"

if [ "$PREVIEW" = "true" ]; then
  cp /etc/nginx/templates/preview.conf /etc/nginx/conf.d/default.conf
elif [ -f "$CERT" ]; then
  cp /etc/nginx/templates/ssl.conf /etc/nginx/conf.d/default.conf
else
  cp /etc/nginx/templates/http-only.conf /etc/nginx/conf.d/default.conf
fi

# e.g. backend:8000 (preview) or wedding-plan-nginx-prod:8050 (prod)
UPSTREAM="${WEDDING_API_NGINX_UPSTREAM:-wedding-plan-nginx-prod:8050}"
sed -i "s|__WEDDING_API_NGINX_UPSTREAM__|${UPSTREAM}|g" /etc/nginx/conf.d/default.conf
