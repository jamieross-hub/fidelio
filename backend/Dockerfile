# Stage 1: build
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build | Uses a dummy database URL as Prisma now requires one set at build time to generate types
RUN rm -rf dist && DATABASE_URL="postgresql://user:pass@localhost:5432/db" npx prisma generate && npx tsc && npx tsc-alias

# Stage 2: production
FROM node:22-alpine
WORKDIR /app

# Install OpenSSL
RUN apk add --no-cache openssl

# Install only prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/api-contract ./api-contract
COPY --from=build /app/prisma.config.ts ./prisma.config.ts

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/server.js"]
