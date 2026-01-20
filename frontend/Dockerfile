FROM ubuntu:latest
LABEL authors="Michael Nielsen"

ENTRYPOINT ["top", "-b"]

# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine
# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*
# Copy static files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Create a custom config to handle React Router (index.html fallback)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
# Use the "exec" form for CMD to ensure it's treated as a command, not a file path
CMD ["nginx", "-g", "daemon off;"]