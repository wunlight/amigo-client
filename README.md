# Amigo Client - Workshop Management System

A modern Vue 3 + TypeScript web application for managing automotive workshop operations, inventory, and sales.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Development](#development)
- [Architecture](#architecture)

---

## Overview

Amigo Client is a workshop management system designed to streamline operations in automotive repair shops. Providing tools for managing inventory (spareparts), handling sale transactions, tracking operations/services, and monitoring business metrics through a centralized dashboard.

**Key Capabilities:**

- User authentication and management
- Real-time inventory tracking
- Point-of-sale (cashier) system
- Operations/services management
- Sales history and reporting
- Business analytics dashboard

---

## Tech Stack

### Core Framework

- **Vue 3** - Progressive JavaScript framework for building user interfaces
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Modern frontend build tool for fast development and optimized production builds

### State Management & Routing

- **Pinia** - Intuitive state management library for Vue 3
- **Vue Router** - Official router for Vue.js applications

### UI & Styling

- **PrimeVue** - Rich UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **@primeuix/themes** - Theme system for PrimeVue components
- **Chart.js** - JavaScript charting library for analytics

### Utilities

- **Axios** - HTTP client for API communication
- **date-fns** - Modern date utility library
- **uuid** - UUID generator for unique identifiers

### Development Tools

- **vue-tsc** - TypeScript compiler for Vue
- **unplugin-vue-components** - Auto-import Vue components
- **@vitejs/plugin-vue** - Vite plugin for Vue SFC support

---

## Project Structure

```
src/
├── features/                 # Feature modules (domain-driven structure)
│   └── <feature_name>/
│       ├── api/             # API endpoints
│       ├── components/      # Reusable UI components
│       ├── stores/          # Pinia stores (state management)
│       ├── types/           # TypeScript type definitions
│       └── views/           # Page components
│
├── components/              # Global/shared components
├── composables/             # Reusable Vue composition functions
├── layouts/                 # Page layout templates
├── assets/                  # Static assets (images, styles)
├── types/                   # Global type definitions
├── utils/                   # Utility functions
├── App.vue                  # Root component
├── main.ts                  # Application entry point
└── router.ts                # Route configuration
```

---

## Features

### 1. **Authentication** (`auth`)

- User login system
- Session management with HTTP-only credentials
- Protected routes with automatic redirects
- Current user profile retrieval

**Types:**

- `LoginPayload` - Email and password credentials
- `LoginResponse` - User information after login

**API Endpoints:**

- `POST /v1/login` - User login
- `GET /v1/me` - Get current user info
- `POST /v1/logout` - User logout

---

### 2. **Cashier / Point-of-Sale** (`cashier`)

Real-time checkout system for processing sales transactions.

**Key Capabilities:**

- Add/remove items (spareparts & operations) to cart
- Real-time stock validation
- Generate checkout with idempotency keys (prevents duplicate transactions)
- Item quantity management

**Types:**

- `CartItem` - Individual item in cart with pricing info
- `CheckoutPayload` - Transaction data for checkout
- `CheckoutResponse` - Receipt data with sale ID and timestamp

**Stores:**

- `useCartStore` - Shopping cart management
- `useCatalogStore` - Available items catalog

---

### 3. **Dashboard** (`dashboard`)

Comprehensive business analytics and overview.

**Metrics Displayed:**

- Daily revenue and transaction count
- Revenue trend (time-series data)
- Top-selling spare parts with revenue
- Recent sales history
- Stock alerts (low/out of stock items)
- Critical inventory items

**Types:**

- `OverviewResponse` - Daily metrics snapshot
- `DashboardResponse` - Complete dashboard data
- `RevenueTrend` - Time-series revenue data
- `TopSparepartItem` - Best-selling products

**Features:**

- Visual charts using Chart.js
- Real-time stock status indicators
- Sales performance tracking

---

### 4. **Spare Parts Inventory** (`sparepart`)

Manage automotive spare parts catalog.

**CRUD Operations:**

- Create new spare parts with initial stock
- View all parts with current stock levels
- Update part information and prices
- Delete parts from catalog

**Types:**

- `SparepartDTO` - Part details (name, price, stock)
- `CreateSparepartPayload` - Initial stock setup
- `UpdateSparepartPayload` - Update part info

**Key Fields:**

- `name` - Part name
- `selling_price` - Retail price
- `stock` - Current inventory level

---

### 5. **Operations/Services** (`operation`)

Manage available workshop services/operations.

**Capabilities:**

- Add new service offerings (e.g., "Oil Change", "Tire Replacement")
- Set pricing for services
- Update service details
- Track service inventory (can be purchased like items)

**Types:**

- `OperationDTO` - Service details
- `CreateOperationPayload` - New service setup
- `UpdateOperationPayload` - Service updates

**Key Fields:**

- `name` - Service name
- `selling_price` - Service cost

---

### 6. **Stock Management** (`stock`)

Advanced inventory tracking and control.

**Features:**

- Stock overview (total parts, low stock alerts, out-of-stock count)
- Inventory value calculation
- Stock alerts and critical items monitoring
- Restock management
- Physical stock opname (inventory count)

**Types:**

- `StockOverview` - High-level inventory metrics
- `ReStockData` - Restock transaction data
- `OpnameData` - Physical inventory count data

**Stores:**

- `useStockStore` - Inventory state management

---

### 7. **Sales History** (`sale`)

Complete sales transaction management and history.

**Data Tracked:**

- Sale ID and timestamp
- Total amount and individual items
- Spareparts and operations sold
- Customer notes
- Sale status

**Types:**

- `SaleDTO` - Complete sale transaction
- `SaleSparepartItem` - Spare part line item
- `SaleOperationItem` - Service line item
- `CartItemType` - 'sparepart' or 'operation'

**Features:**

- Query sales history
- Detailed receipt information
- Item-level breakdown of transactions

---

### 8. **User Management** (`user`)

Admin controls for team members.

**Operations:**

- Create new users (staff members)
- View user list
- Update user information
- Delete users

**Types:**

- `UserDTO` - User profile info
- `CreateUserPayload` - New user registration
- `UpdateUserPayload` - User profile updates

**Key Fields:**

- `name` - Full name
- `email` - Login email
- `created_at` - Account creation timestamp

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- pnpm >= 12.11.2

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd amigo-client
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment:

```bash
cp .env.example .env
```

### Running the Application

**Development Mode:**

```bash
pnpm run dev
```

**Production Build:**

```bash
pnpm run build
```

**Preview Production Build:**

```bash
pnpm run preview
```

---

## Development

### Code Organization Pattern

Each feature follows a consistent structure for maintainability:

```
feature/
├── types/
│   └── *.type.ts          # TypeScript interfaces/types
├── api/
│   └── index.ts           # API client methods
├── stores/
│   └── use-*.ts           # Pinia store definitions
├── components/            # Feature-specific components
│   └── *.vue              # Reusable components
└── views/
    └── *-view.vue         # Page-level components
```

### Adding a New Feature

1. Create feature folder under `src/features/`
2. Set up standard subdirectories: `types/`, `api/`, `stores/`, `views/`, `components/`
3. Define TypeScript types first in `types/`
4. Implement API client in `api/index.ts`
5. Create Pinia store in `stores/`
6. Build UI components and views

### API Client Pattern

```typescript
// api/index.ts
import { apiClient } from '@/utils/api-client'
import type { SuccessResponse } from '@/types/response.type'

export const getData = () => apiClient.get<SuccessResponse<DataType>>('/v1/endpoint')

export const createData = (payload: CreatePayload) =>
  apiClient.post<SuccessResponse<DataType>>('/v1/endpoint', payload)
```

### State Management with Pinia

```typescript
// stores/use-feature-store.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFeatureStore = defineStore('feature', () => {
  const items = ref([])
  const loading = ref(false)

  const itemCount = computed(() => items.value.length)

  async function fetchItems() {
    loading.value = true
    try {
      const { data } = await getItems()
      items.value = data.data
    } finally {
      loading.value = false
    }
  }

  return { items, loading, itemCount, fetchItems }
})
```

### Component Usage

```vue
<script setup lang="ts">
import { useFeatureStore } from '@/features/feature/stores/use-feature-store'

const store = useFeatureStore()
store.fetchItems()
</script>

<template>
  <div>
    <div v-if="store.loading">Loading...</div>
    <div v-for="item in store.items" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>
```

### Global Types

Located in `src/types/response.type.ts`:

```typescript
SuccessResponse<T> // Single item response
PaginatedResponse<T> // List with pagination metadata
ErrorResponse // Error response structure
```

### API Client Configuration

Located in `src/utils/api-client.ts`:

- Base URL: `http://localhost:8080/api`
- Request timeout: 10 seconds
- Credentials: Enabled for session management
- Response error handling with logging

### Styling

- **Tailwind CSS** - Utility classes for custom styles
- **PrimeVue** - Pre-built components with themes
- **CSS Variables** - Theme customization in `main.ts`

---

## Architecture

### Authentication Flow

```
Login Request
    ↓
POST /v1/login
    ↓
Set HTTP-only Cookie
    ↓
Store in Pinia (useAuthStore)
    ↓
Redirect to Dashboard
```

### Protected Routes

Router guards check authentication status before accessing protected pages:

- If not authenticated → Redirect to `/login`
- If authenticated + on `/login` → Redirect to home (`/`)

### Data Flow

```
Vue Component
    ↓
Pinia Store (useFeatureStore)
    ↓
API Client (axios)
    ↓
Backend API
    ↓
Response → Store → Component
```

### Route Map

| Route            | Feature   | Protected | Purpose                |
| ---------------- | --------- | --------- | ---------------------- |
| `/login`         | auth      | ❌        | User authentication    |
| `/`              | cashier   | ✅        | Point-of-sale checkout |
| `/dashboard`     | dashboard | ✅        | Business analytics     |
| `/stock-manager` | stock     | ✅        | Inventory management   |
| `/spareparts`    | sparepart | ✅        | Parts catalog          |
| `/operations`    | operation | ✅        | Services management    |
| `/users`         | user      | ✅        | User management        |
| `/sales`         | sale      | ✅        | Sales history          |

---

## Troubleshooting

### API Connection Issues

- Verify backend is running on `http://localhost:8080`
- Check CORS headers if developing locally
- Enable `withCredentials` in axios config

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm run build
```

### TypeScript Errors

```bash
# Validate TypeScript configuration
pnpm exec vue-tsc --noEmit
```

---

## Performance Considerations

- Lazy-load feature routes with dynamic imports
- Auto-import components with unplugin-vue-components
- Optimize images and assets
- Use computed properties for derived state
- Implement pagination for large lists

---

## Environment Variables

Create `.env` file in project root:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
```
