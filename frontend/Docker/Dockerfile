FROM nginx:1.17.1-alpine AS base
WORKDIR /app
EXPOSE 80
COPY ["frontend/nginx.conf", "/etc/nginx/nginx.conf"]

FROM node:12.6.0-alpine as build
WORKDIR /src
COPY ["frontend/Client", "Client/"]
WORKDIR /src/Client
RUN npm install
RUN npm run build

FROM base AS final
WORKDIR /app
COPY --from=build /src/Client/build /app/wwwroot
