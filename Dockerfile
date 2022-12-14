# build static
FROM node:16.17.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build



# nginx state for serving content
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets over
COPY --from=build /app/build ./

# Copy nginx configuration
COPY production/nginx.default.conf /etc/nginx/conf.d/default.conf

# Copy https credentials
RUN mkdir -p  /usr/local/nginx/cert
COPY credentials/certificate_combined.crt /usr/local/nginx/cert/certificate_combined.crt
COPY credentials/private.key /usr/local/nginx/cert/private.key
