FROM node:24-slim AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest && corepack enable
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build

FROM nginx:alpine
RUN apk add --no-cache apache2-utils dos2unix gettext
COPY docker/nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/packages/web/dist /usr/share/nginx/html
COPY docker/generate-config.sh /docker-entrypoint.d/40-generate-config.sh
COPY docker/generate-auth.sh /docker-entrypoint.d/30-generate-auth.sh
ENV NGINX_PORT=80
RUN chmod +x /docker-entrypoint.d/40-generate-config.sh /docker-entrypoint.d/30-generate-auth.sh \
    && dos2unix /docker-entrypoint.d/40-generate-config.sh /docker-entrypoint.d/30-generate-auth.sh
EXPOSE 80
