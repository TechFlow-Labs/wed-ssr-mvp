#!/bin/sh
set -e
CERT="/etc/letsencrypt/live/wedapp.gr/fullchain.pem"
if [ -f "$CERT" ]; then
  cp /etc/nginx/templates/ssl.conf /etc/nginx/conf.d/default.conf
else
  cp /etc/nginx/templates/http-only.conf /etc/nginx/conf.d/default.conf
fi
