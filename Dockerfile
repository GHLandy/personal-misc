FROM node:16-alpine AS BUILD_STAGE
WORKDIR /app
COPY . /app
RUN npm i && npm run build

FROM nginx:1.18-alpine
COPY --from=BUILD_STAGE /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
