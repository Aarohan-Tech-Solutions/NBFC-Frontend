# NBFC DSA & Lending Management System — 3-Panel Monorepo

Enterprise-grade, backend-agnostic frontend monorepo for an Indian NBFC loan origination, DSA distribution, and multi-tier bank credit appraisal & disbursement platform. Built with **pnpm workspaces**, **Turborepo**, **Vite**, **React 18**, **TypeScript**, **Tailwind CSS**, and **TanStack React Query**.

---

## 🏛️ 3-Panel System Architecture

```text
NBFC-DSA-LOAN-SYSTEM/
├── apps/
│   ├── admin/               # Port 3000: Super Admin / Branch Mgr / Area Mgr / DSA / Connector Panel
│   ├── client/              # Port 3001: Customer-facing loan application & status tracking portal
│   └── bank-officials/      # Port 3002: Bank Underwriting, Field Verification, Sanction & Disbursement Desk
├── packages/
│   ├── ui/                  # Shared UI library (Button, Modal, DataTable, Skeleton, ErrorBoundary, etc.)
│   ├── shared-types/        # Shared DTOs, Enums (Role, LoanStatus), Sanction & Adverse action schemas
│   ├── api-client/          # Backend-Agnostic API Client (17 typed endpoint modules + Mock DB + Live Axios)
│   └── config/              # Shared TSConfig, Tailwind, and PostCSS presets
├── API_CONTRACT.md          # Full 9-domain backend API specification & JSON contracts
├── Dockerfile               # Production multi-stage Docker build
├── docker-compose.yml       # Production 3-port Nginx compose setup
└── nginx.conf               # Multi-port SPA fallback & proxy routing
```

### Application Panels & Ports

| Panel | Workspace | Port | Primary User Personas & Responsibilities |
| :--- | :--- | :--- | :--- |
| **Admin & DSA** | `apps/admin` (`@nbfc/admin`) | `3000` | Super Admin, Company Admin, Area Manager, Branch Manager, DSA Partners, Lead Connectors, Operations Staff. Commercial pipeline, branch targets, DSA payouts, CRM, CMS. |
| **Borrower Portal** | `apps/client` (`@nbfc/client`) | `3001` | Retail & MSME Borrowers. Self-service loan application, document vault upload, EMI calculator, live stage tracker. |
| **Bank Officials** | `apps/bank-officials` (`@nbfc/bank-officials`) | `3002` | Senior Credit Officers, Field Verification Officers, Disbursement Managers, Branch Underwriting Heads. 360° credit appraisal, statutory sanction letter issuance, escrow release desk, adverse action notices. |

---

## 🔌 100% Backend-Agnostic Architecture

This frontend is **100% backend-agnostic**:
1. **Zero Raw HTTP String Calls in Feature Code**: All UI views consume strictly typed named functions exported from `@nbfc/api-client` (e.g. `loansApi.getLoans()`, `bankOfficialsApi.calculateSanction()`, `verificationApi.submitVerificationReview()`). No `fetch()` or `axios.get("/raw-path")` exists in feature components.
2. **Instant Mock ⇄ Live Switching**: Toggle between realistic in-memory database simulation and live REST/GraphQL backends with a single environment variable:
   ```bash
   # .env
   VITE_API_MODE=mock   # Uses stateful in-memory database with artificial latency simulation
   # OR
   VITE_API_MODE=live   # Connects to live backend with JWT auth headers, automatic 401 refresh & retries
   VITE_API_BASE_URL=https://api.yourbank.com/api/v1
   ```
3. **Plug-and-Play Backend**: Swapping backends (REST, GraphQL, tRPC, Firebase) requires modifying **only** `packages/api-client`, never any UI code or feature components.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: `>= 18.0.0`
- **pnpm**: `>= 9.0.0`

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run All 3 Panels Concurrently
```bash
pnpm dev
```
Open your browser to:
- **Admin & DSA Panel**: [http://localhost:3000](http://localhost:3000)
- **Borrower Portal**: [http://localhost:3001](http://localhost:3001)
- **Bank Officials Desk**: [http://localhost:3002](http://localhost:3002)

### 3. Run Automated Tests
```bash
pnpm test
```
Runs comprehensive Vitest test suites across `@nbfc/api-client`, `@nbfc/admin`, `@nbfc/client`, and `@nbfc/bank-officials`.

### 4. Run Monorepo Type Check
```bash
pnpm type-check
```

### 5. Production Build
```bash
pnpm build
```

---

## 🐳 Docker Deployment

To build and run all 3 panels in a unified containerized Nginx environment:

```bash
# Build & Start Container
docker compose up -d --build

# Check Running Container
docker compose ps
```
Access the services at:
- `http://localhost:3000` (Admin Panel)
- `http://localhost:3001` (Customer Portal)
- `http://localhost:3002` (Bank Official Desk)

---

## 📖 API Contract Specification

For full details on payload structures, query filters, authentication flows, and error codes for backend integration, refer to [API_CONTRACT.md](./API_CONTRACT.md).
