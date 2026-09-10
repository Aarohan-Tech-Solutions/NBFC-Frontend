# ===================================================
# Multi-Stage Dockerfile for NBFC-DSA-LOAN-SYSTEM (3-Panel)
# ===================================================

# --- Stage 1: Build all packages & apps with pnpm + Turborepo ---
FROM node:20-alpine AS builder

WORKDIR /app

# Enable corepack and prepare pnpm
RUN corepack enable && corepack prepare pnpm@9.1.0 --activate

# Copy dependency manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/ packages/
COPY apps/ apps/

# Install all workspace dependencies
RUN pnpm install --frozen-lockfile

# Build shared packages and apps
RUN pnpm build

# --- Stage 2: Serve using Nginx ---
FROM nginx:alpine AS runner

# Copy customized Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production static bundles
COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html/admin
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html/client
COPY --from=builder /app/apps/bank-officials/dist /usr/share/nginx/html/bank-officials

EXPOSE 3000 3001 3002

CMD ["nginx", "-g", "daemon off;"]
