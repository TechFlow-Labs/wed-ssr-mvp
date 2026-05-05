FROM nginx:1.27-alpine

RUN rm -f /etc/nginx/conf.d/default.conf

COPY templates/http-only.conf /etc/nginx/templates/http-only.conf
COPY templates/ssl.conf       /etc/nginx/templates/ssl.conf
COPY templates/preview.conf   /etc/nginx/templates/preview.conf
COPY docker-entrypoint.d/40-wedapp-config.sh /docker-entrypoint.d/40-wedapp-config.sh
RUN chmod +x /docker-entrypoint.d/40-wedapp-config.sh
