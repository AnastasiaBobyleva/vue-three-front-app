FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
COPY libs libs
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx:latest as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf