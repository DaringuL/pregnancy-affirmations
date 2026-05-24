# Stage 1: Build the Angular project using Node.js and npm
FROM node:lts-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit --legacy-peer-deps

# Copy the rest of the project files
COPY . .

# Build the Angular project for production
RUN npm run build

# Stage 2: Serve the static site with unprivileged Nginx
FROM nginxinc/nginx-unprivileged:mainline-alpine

# Copy the built static files from the builder stage
# The path matches the default Angular 17+ output structure
COPY --from=builder /app/dist/pregnancy-affirmations/browser /usr/share/nginx/html

# Expose the default port (8080) for the unprivileged Nginx image
EXPOSE 8080

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
