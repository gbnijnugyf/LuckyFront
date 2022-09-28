FROM node:16 as build
WORKDIR /app
COPY . .
ARG BUILD_ENV=production
RUN yarn config set registry https://registry.npm.taobao.org/ \
    && yarn install \
    && bash -c 'if [[ "${BUILD_ENV}" -eq "development" ]] ; then yarn build:dev ; else yarn build ; fi'
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
