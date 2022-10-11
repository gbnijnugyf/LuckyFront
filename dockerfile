FROM node:16 as build
WORKDIR /app
COPY . .
ARG BUILD_ENV=production
RUN npm i -g pnpm \
    && pnpm install \
    && bash -c 'if [[ "${BUILD_ENV}" -eq "development" ]] ; then pnpm run build:dev ; else pnpm build ; fi'

FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
