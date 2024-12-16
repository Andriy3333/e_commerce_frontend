# Use Node.js 20 as the base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy remaining application code
COPY . .

# Build the Next.js project
RUN npm run build

# Use a minimal production image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app ./

# Expose port 3000
EXPOSE 3000

# Start Next.js server
CMD ["npm", "start"]