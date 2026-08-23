# NBFC DSA Loan Management Platform - Frontend Monorepo

Production-grade monorepo setup for an NBFC DSA (Direct Selling Agent) Loan Management Platform built with **pnpm workspaces**, **Turborepo**, **Vite**, **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

## Monorepo Layout

```text
nbfc-frontend/
├── apps/
│   ├── admin/               # Internal dashboard (Company/Area/Branch/DSA/Connector/Staff roles)
│   └── client/              # Customer-facing loan application portal
├── packages/
│   ├── ui/                  # Shared component library (Button, Input, Select, Modal, DataTable, Badge, Tabs)
│   ├── shared-types/        # Shared TS types, Enums & Zod schemas (Roles, LoanStatus, DocumentTypes, DTOs)
│   ├── api-client/          # Shared typed API client layer (Axios instance + auth interceptors + endpoints)
│   └── config/              # Shared TSConfig, ESLint, Tailwind & Prettier base configs
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

## Quick Start

### Prerequisites
- **Node.js**: `>= 18.0.0`
- **pnpm**: `>= 9.0.0`

### Installation

Install all workspace dependencies:

```bash
pnpm install
```

### Running Applications

To start both `admin` and `client` dev servers concurrently side by side:

```bash
pnpm dev
```

- **Admin Dashboard**: `http://localhost:3000` (or `http://localhost:5173`)
- **Client Portal**: `http://localhost:3001` (or `http://localhost:5174`)

### Build & Type Check

Build all packages and apps:

```bash
pnpm build
```

Run type checking across all workspaces:

```bash
pnpm type-check
```

Run linting across all workspaces:

```bash
pnpm lint
```

## Architecture Principles

1. **Feature-Based Architecture (`apps/admin` & `apps/client`)**:
   - Each domain (e.g. `dsa`, `loans`, `verification`, `commissions`) owns its own components, hooks, api calls, and types.
   - Cross-feature dependencies flow through shared `packages/`.
2. **Role-Driven Navigation**:
   - Admin sidebar is configured dynamically via `constants/nav-config.ts` mapping `Role` enum to allowed modules.
3. **Shared API Layer**:
   - `packages/api-client` encapsulates Axios instance, authorization headers, 401 refresh handler, and typed endpoint hooks.
