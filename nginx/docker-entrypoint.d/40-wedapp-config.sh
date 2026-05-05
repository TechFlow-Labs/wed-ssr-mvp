#!/bin/sh
set -e

if [ "${PREVIEW_MODE:-false}" = "true" ]; then
  cp /etc/nginx/templates/preview.conf /etc/nginx/conf.d/default.conf
else
  CERT="/etc/letsencrypt/live/wedapp.gr/fullchain.pem"
  if [ -f "$CERT" ]; then
    cp /etc/nginx/templates/ssl.conf /etc/nginx/conf.d/default.conf
  else
    cp /etc/nginx/templates/http-only.conf /etc/nginx/conf.d/default.conf
  fi
fi

# e.g. https://{slug}-api.preview.domain.com (preview) or wedding-plan-nginx-prod:8050 (prod)
UPSTREAM="${WEDDING_API_NGINX_UPSTREAM:-wedding-plan-nginx-prod:8050}"
sed -i "s|__WEDDING_API_NGINX_UPSTREAM__|${UPSTREAM}|g" /etc/nginx/conf.d/default.conf
