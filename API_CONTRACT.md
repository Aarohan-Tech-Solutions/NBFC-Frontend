# NBFC-DSA-LOAN-SYSTEM API Contract & Interface Specification

> **Backend Integrator Notice**:  
> This document defines the strict, backend-agnostic typed API contract for the **NBFC-DSA-LOAN-SYSTEM** frontend.  
> The entire frontend interacts exclusively via `@nbfc/api-client` driven by `@nbfc/shared-types`.  
> Any backend (REST, GraphQL, microservices, NestJS, FastAPI, Go, Spring, Firebase) implementing this specification can be plugged in simply by pointing `VITE_API_BASE_URL` to your server and setting `VITE_API_MODE=live`.

---

## 1. Global Standards & Conventions

### Base URLs & Headers
- **Default Base Path**: `/api/v1`
- **Request Headers**:
  - `Content-Type: application/json`
  - `Accept: application/json`
  - `Authorization: Bearer <JWT_ACCESS_TOKEN>` (for protected routes)

### Standard Response Envelopes
#### Standard Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional human-readable confirmation message",
  "timestamp": "2026-08-24T10:00:00.000Z"
}
```

#### Standard Paginated Response
```json
{
  "success": true,
  "data": [ ... ],
  "total": 128,
  "page": 1,
  "limit": 20,
  "totalPages": 7
}
```

#### Standard Error Response (`ApiErrorData`)
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Validation failed for one or more fields.",
    "status": 400,
    "fieldErrors": {
      "amount": ["Loan amount must be at least ₹ 50,000"],
      "panNumber": ["Invalid PAN format (e.g. ABCDE1234F)"]
    },
    "details": {}
  }
}
```

---

## 2. Domain Endpoints Specification

### 2.1 Authentication & Session (`/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Official / Admin / DSA login with email/password or role | None |
| `POST` | `/auth/customer-login` | Retail customer login with Phone & OTP | None |
| `POST` | `/auth/refresh` | Exchange `refreshToken` for new `accessToken` | None |
| `GET` | `/auth/me` | Fetch authenticated user profile & active scope | Bearer |
| `POST` | `/auth/logout` | Revoke session and invalidate refresh tokens | Bearer |

#### `POST /auth/login` Request & Response
```json
// Request Body
{
  "email": "allie.admin@nbfc.com",
  "password": "SecurePassword123!",
  "role": "super_admin"
}

// 200 OK Response
{
  "user": {
    "id": "usr-admin-1",
    "name": "Allie Grater",
    "email": "allie.admin@nbfc.com",
    "role": "super_admin",
    "phone": "+91 98300 00001",
    "branchId": "br-kol-01",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2026-08-23T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "d8f3a9e0-1c34-4b55-a223-998877665544"
}
```

---

### 2.2 Loan Origination & Lifecycle (`/loans`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/loans` | List loans with filtering (`status`, `loanType`, `search`, `page`, `limit`) | Bearer |
| `GET` | `/loans/:id` | Get 360° details of a specific loan application | Bearer |
| `POST` | `/loans` | Create a new loan application | Bearer |
| `PATCH`| `/loans/:id/status`| Transition loan status (`submitted`, `pending_verification`, `under_review`, `approved`, `sanctioned`, `disbursed`, `rejected`, `closed`) | Bearer |
| `GET` | `/customer/applications/:appNo/status` | Public / Customer status tracking | None / Customer |

#### `POST /loans` Request Body
```json
{
  "customerId": "cust-1",
  "loanType": "mortgage",
  "amount": 2500000,
  "tenureMonths": 180,
  "interestRate": 9.8,
  "employmentType": "self_employed",
  "monthlyIncome": 110000,
  "coApplicantName": "Subrata Sen",
  "coApplicantRelationship": "Father & Co-Applicant",
  "dsaId": "dsa-1",
  "connectorId": "con-1",
  "branchId": "br-kol-01"
}
```

---

### 2.3 Verification & Field Inspection (`/verification`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/verification/queue` | List verification tasks (`category`: `KYC`, `Bank`, `Property`, `Guarantor`, `Document`) | Bearer (Staff/Official) |
| `GET` | `/verification/tasks/:id` | Get specific verification task details & checklist | Bearer |
| `PATCH`| `/verification/tasks/:id` | Update task status (`Pending`, `In Progress`, `Verified`, `Action Required`, `Rejected`) | Bearer |
| `POST` | `/verification/tasks/:id/review` | Submit field findings, dynamic checklist values, and official remarks | Bearer |

#### `POST /verification/tasks/:id/review` Request Body
```json
{
  "taskId": "vtask-1",
  "loanId": "loan-1",
  "category": "property",
  "status": "verified",
  "remarks": "Clear 30-year non-encumbrance title validated. Fair market valuation ₹ 65 Lakhs.",
  "verifiedBy": "Advocate P. Sharma",
  "checklistState": {
    "title_search_30yr": true,
    "mutation_certificate": true,
    "property_tax_receipt": true
  }
}
```

---

### 2.4 Bank Official Sanction & Decisioning (`/bank-officials`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/bank-officials/dashboard-metrics` | Fetch official assigned files, SLA status, queue counts | Bearer (Bank Official) |
| `POST` | `/bank-officials/sanction/generate` | Generate and digitally sign formal Sanction Letter | Bearer (Sanction Authority) |
| `POST` | `/bank-officials/loans/:id/reject` | Log statutory rejection reason code and trigger adverse action notice | Bearer (Credit Head) |

#### `POST /bank-officials/sanction/generate` Request Body
```json
{
  "input": {
    "loanId": "loan-1",
    "requestedAmount": 4500000,
    "approvedAmount": 4500000,
    "interestRate": 8.75,
    "tenureMonths": 240,
    "processingFeePercent": 1.0,
    "insuranceFee": 12500,
    "foirPercent": 42.5
  },
  "metadata": {
    "borrowerName": "Rahul Kapoor",
    "coBorrowerName": "Sunita Kapoor",
    "appNo": "LA-9485",
    "loanProduct": "HOME LOAN",
    "officialName": "Dr. Anirban Mukherjee"
  }
}
```

---

### 2.5 Escrow Fund Disbursement (`/disbursement`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/disbursement` | Get escrow payout pipeline (`status`: `Pending`, `Initiated`, `Success`, `Failed`) | Bearer |
| `GET` | `/disbursement/:id` | Get disbursement item details with deduction breakdown | Bearer |
| `POST` | `/disbursement/authorize` | Authorize RTGS fund transfer & record bank transaction UTR | Bearer (Disbursement Officer) |
| `POST` | `/disbursement/batch-generate` | Generate bulk RTGS/NEFT payment batch payload for escrow bank | Bearer |

#### `POST /disbursement/authorize` Request Body
```json
{
  "loanId": "loan-1",
  "sanctionedAmount": 4500000,
  "deductions": {
    "processingFee": 45000,
    "insurance": 12500,
    "documentationCharges": 2500
  },
  "netDisbursal": 4440000,
  "beneficiaryBank": "HDFC Bank Ltd.",
  "accountNumber": "50100084920194",
  "ifsc": "HDFC0000060",
  "accountHolder": "Rahul Kapoor",
  "paymentMode": "RTGS",
  "transactionId": "RTGS-994820101",
  "authorizedBy": "Amitabh Sen"
}
```

---

### 2.6 Document Vault & S3 Presigned URLs (`/documents`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/documents` | List uploaded documents for a loan or applicant | Bearer |
| `POST` | `/documents/presigned-url` | Generate S3/Cloud storage presigned upload URL | Bearer |
| `POST` | `/documents/confirm` | Confirm completed upload & register file in vault | Bearer |
| `PATCH`| `/documents/:id/verify` | Mark document as verified or rejected with remarks | Bearer |

#### `POST /documents/presigned-url`
```json
// Request
{
  "docType": "property",
  "fileName": "deed_registry.pdf"
}

// 200 OK Response
{
  "uploadUrl": "https://nbfc-vault.s3.ap-south-1.amazonaws.com/uploads/1724500000_deed_registry.pdf?X-Amz-Signature=...",
  "fileKey": "uploads/1724500000_deed_registry.pdf"
}
```

---

### 2.7 Partner & Network Management (`/dsa`, `/connectors`, `/commissions`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/dsa` | List Direct Selling Agent agencies | Bearer (Admin/BM) |
| `POST` | `/dsa` | Register new DSA partner & generate partner code | Bearer |
| `GET` | `/connectors` | List referral connectors | Bearer (Admin/DSA) |
| `POST` | `/connectors` | Register referral connector partner | Bearer |
| `GET` | `/commissions` | List commission ledger for DSAs & Connectors | Bearer |
| `POST` | `/commissions/:id/payout` | Process and mark commission payment as disbursed | Bearer |

---

### 2.8 Customer 360, Leads & CRM (`/customers`, `/leads`, `/crm`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/customers` | List borrower records with KYC status | Bearer |
| `GET` | `/customer/profile` | Logged-in customer profile | Bearer (Customer) |
| `GET` | `/customer/dashboard` | Customer dashboard KPIs & active loans summary | Bearer (Customer) |
| `GET` | `/leads` | List sourced leads | Bearer |
| `POST` | `/leads` | Ingest new lead from website, DSA, or connector | Bearer / Public |
| `PATCH`| `/leads/:id/status` | Update lead status (`new`, `contacted`, `qualified`, `converted`, `lost`) | Bearer |
| `GET` | `/crm/logs` | Fetch CRM call logs, WhatsApp interactions, notes | Bearer |
| `POST` | `/crm/logs` | Record follow-up interaction or schedule next call | Bearer |

---

### 2.9 Governance, Organization & Masters (`/branches`, `/areas`, `/users`, `/reports`, `/settings`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/branches` | List all NBFC branch offices with assigned BM and Underwriting Head | Bearer |
| `POST` | `/branches` | Create new branch office | Bearer (Super Admin) |
| `GET` | `/areas` | List regional area clusters | Bearer |
| `GET` | `/users` | List internal staff and user logins | Bearer (Admin) |
| `POST` | `/users` | Create staff user with assigned role | Bearer (Admin) |
| `GET` | `/reports` | Portfolio summary & AUM breakdown | Bearer (Management) |
| `GET` | `/reports/branches` | Branch-wise TAT & SLA adherence metrics | Bearer (Management) |
| `GET` | `/settings` | Global system settings & communication gateways | Bearer (Admin) |
| `GET` | `/security/audit-logs` | Immutable audit trail of financial & underwriting actions | Bearer (Admin) |

---

## 3. Standard Error Codes Reference

| Error Code | HTTP Status | Description |
| :--- | :--- | :--- |
| `UNAUTHORIZED` | `401` | Missing or invalid JWT access token |
| `SESSION_EXPIRED` | `401` | Refresh token expired; redirect to login |
| `FORBIDDEN` | `403` | Role lacks operational permission for this module |
| `NOT_FOUND` | `404` | Requested loan, customer, or task does not exist |
| `INVALID_INPUT` | `422` | Request body validation failure (returns `fieldErrors`) |
| `SANCTION_LIMIT_EXCEEDED`| `400` | Requested loan amount exceeds official's delegated sanction limit |
| `SLA_BREACHED` | `409` | File is locked due to unresolved SLA escalation |
| `INTERNAL_ERROR` | `500` | Unexpected server exception |
