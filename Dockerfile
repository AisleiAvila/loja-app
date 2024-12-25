# Etapa de build com Node.js
FROM node:22.11.0 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa de produção com Nginx
FROM nginx:alpine
COPY --from=build /app/dist/loja-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
