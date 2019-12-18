FROM alpine:3.10

# RUN apk --no-cache add caddy
RUN apk --no-cache add --virtual .temp curl \
    && curl -sSfL https://github.com/caddyserver/caddy/releases/download/v2.0.0-beta10/caddy2_beta10_linux_amd64 \
        -o /usr/sbin/caddy \
    && chmod u+x /usr/sbin/caddy \
    && apk del .temp

# COPY ./caddy.json /etc/caddy/
COPY ./Caddyfile /etc/caddy/

COPY ./src /var/www

EXPOSE 8080
# CMD ["caddy", "run", "--config=/etc/caddy/caddy.json"]
# CMD ["caddy", "run", "--config=/etc/caddy/caddy.json", "--adapter=json5"]
CMD ["caddy", "run", "--config=/etc/caddy/Caddyfile", "--adapter=caddyfile"]
