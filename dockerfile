FROM node:14 as build
WORKDIR /app
COPY . .
RUN yarn config set registry https://registry.npm.taobao.org/
    && yarn install 
    && yarn build
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
