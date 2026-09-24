# SharkIT Assessment — FinPulse Deal Feed

A full-stack investor deal-feed application built for the SharkIT assessment.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Bootstrap 5 (no Tailwind) |
| Backend | Node.js + Express 4 |
| Database | MySQL 8+ (via `mysql2` connection pool) |
| Pattern | Controller → Service → Repository |

---

## Project Structure

```
sharkit-assessment/
├── frontend/              # Vite + React SPA
│   ├── src/
│   │   ├── components/    # Header, DealCard, FilterPills, PostAskModal, LoginModal, BrandLogo
│   │   ├── utils/         # formatters.js (formatINR, getRelativeTime)
│   │   ├── App.jsx        # Root component, state, API calls
│   │   ├── main.jsx       # React DOM entry
│   │   └── index.css      # Global reset + glass utilities (plain CSS)
│   ├── index.html
│   └── vite.config.js
│
└── backend/               # Express API server
    └── src/
        ├── config/        # db.js — mysql2 connection pool
        ├── controllers/   # dealController.js
        ├── services/      # dealService.js
        ├── repositories/  # dealRepository.js
        ├── validators/    # dealValidator.js
        └── server.js
```

---

## Prerequisites

- Node.js >= 18
- MySQL 8+ running locally (default port `3306`)

---

## Database Setup

```sql
CREATE DATABASE IF NOT EXISTS sharkit_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE sharkit_db;

CREATE TABLE IF NOT EXISTS deals (
  id             CHAR(36)                     PRIMARY KEY,
  company_name   VARCHAR(255)                 NOT NULL,
  founder_name   VARCHAR(255)                 NOT NULL,
  sector         VARCHAR(255)                 NOT NULL,
  pitch          TEXT                         NOT NULL,
  funding_type   ENUM('Equity','Loan','Grant') NOT NULL,
  amount_sought  INT UNSIGNED                 NOT NULL,
  equity_offered DECIMAL(5,2)                 DEFAULT NULL,
  created_at     TIMESTAMP                    DEFAULT CURRENT_TIMESTAMP
);
```

---

## Environment Variables

### `backend/.env`

```env
PORT=4000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=sharkit_db
```

### `frontend/.env` (optional)

```env
VITE_API_URL=http://localhost:4000/api
```

If omitted, the frontend defaults to `http://localhost:4000/api`.

---

## Getting Started

### 1. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Start the backend

```bash
cd backend
npm run dev        # nodemon — auto-restarts on change
# or
npm start          # plain node
```

Backend runs at **http://localhost:4000**

### 3. Start the frontend

```bash
cd frontend
npm run dev
```

Frontend runs at **http://localhost:5173** (Vite default)

---

## Test Credentials

| Field    | Value                  |
|----------|------------------------|
| Email    | `admin@sharkit.demo`   |
| Password | `sharkit2026`          |

> Authentication is client-side only (localStorage flag). No JWT or session is issued.

---

## API Contracts

### `GET /api/deals`

Returns all investment asks, ordered newest-first.

**Query Parameters**

| Param  | Type     | Required | Description |
|--------|----------|----------|-------------|
| `type` | `string` | No       | Filter by funding type. Accepted: `Equity`, `Loan`, `Grant`. Any other value returns all deals. |

**Success Response — `200 OK`**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "company_name": "Acme Flow",
      "founder_name": "Priya Sharma",
      "sector": "FinTech",
      "pitch": "AI-driven cash-flow forecasting for Indian SMEs.",
      "funding_type": "Equity",
      "amount_sought": 5000000,
      "equity_offered": 8.5,
      "created_at": "2026-09-23T10:00:00.000Z"
    }
  ]
}
```

**Error Response — `500 Internal Server Error`**

```json
{
  "success": false,
  "error": "ER_NO_SUCH_TABLE: Table 'sharkit_db.deals' doesn't exist",
  "code": "ER_NO_SUCH_TABLE"
}
```

---

### `POST /api/deals`

Creates a new investment ask.

**Request Headers**

```
Content-Type: application/json
```

**Request Body Schema**

| Field           | Type     | Required                          | Constraints |
|-----------------|----------|-----------------------------------|-------------|
| `company_name`  | `string` | Yes                               | Min 2 characters |
| `founder_name`  | `string` | Yes                               | Min 3 characters |
| `sector`        | `string` | Yes                               | Min 3 characters |
| `pitch`         | `string` | Yes                               | Min 25 characters |
| `funding_type`  | `string` | Yes                               | `"Equity"`, `"Loan"`, or `"Grant"` |
| `amount_sought` | `number` | Yes                               | Min `100000` (Rs. 1 lakh) |
| `equity_offered`| `number` | Yes (only if `funding_type` = `"Equity"`) | 0.5 – 49 inclusive |

**Example Request**

```json
{
  "company_name": "Acme Flow",
  "founder_name": "Priya Sharma",
  "sector": "FinTech",
  "pitch": "AI-driven cash-flow forecasting for Indian SMEs that need working capital.",
  "funding_type": "Equity",
  "amount_sought": 5000000,
  "equity_offered": 8.5
}
```

**Success Response — `201 Created`**

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "company_name": "Acme Flow",
    "founder_name": "Priya Sharma",
    "sector": "FinTech",
    "pitch": "AI-driven cash-flow forecasting for Indian SMEs that need working capital.",
    "funding_type": "Equity",
    "amount_sought": 5000000,
    "equity_offered": 8.5,
    "created_at": "2026-09-23T10:00:00.000Z"
  }
}
```

**Validation Error — `400 Bad Request`**

```json
{
  "success": false,
  "errors": [
    "Company name must be at least 2 characters.",
    "Amount sought must be at least Rs. 1,00,000."
  ]
}
```

**Server Error — `500 Internal Server Error`**

```json
{
  "success": false,
  "error": "ER_DUP_ENTRY: Duplicate entry ...",
  "code": "ER_DUP_ENTRY"
}
```

---

## Health Check

```
GET /health
```

```json
{ "status": "ok", "engine": "MySQL" }
```

---

## Deployment Notes

- **Frontend (Netlify):** `netlify.toml` is already configured in `frontend/`. Set `VITE_API_URL` as an env var in the Netlify dashboard pointing to your deployed backend.
- **Backend:** Deployable to Railway, Render, or any Node.js host. Set all `DB_*` and `PORT` env vars. Ensure the MySQL instance is reachable from the host.
# SharkIT
