# Amigo Client

A modern web-based Point-of-Sale (POS) and Workshop Management System designed to streamline inventory tracking, repair services, and checkout operations for automotive repair shops.

---

## Technologies

- **Core:** Vue 3, TypeScript, Vite
- **State & Routing:** Pinia, Vue Router
- **UI & Styling:** PrimeVue, Tailwind CSS, Chart.js
- **Network & Utils:** Axios, date-fns, uuid

---

## Features

- **Cashier Checkout:** Real-time cart management with idempotency key protection to prevent duplicate transactions.
- **Inventory & Stock Control:** Live tracking of automotive spare parts, low-stock alerts, and physical stock opname.
- **Workshop Operations:** Custom service and labor management alongside retail parts.
- **Business Dashboard:** Daily revenue snapshots, top-selling items breakdown, and interactive analytics charts.
- **Role & User Management:** Secure admin and staff account controls with HTTP-only session management.

---

## Process & Architecture

Built using a **domain-driven feature modular structure** (`src/features/`), separating concerns cleanly into API clients, Pinia stores, views, and components.

- Integrated with a Go backend utilizing clean architecture layering and PostgreSQL transaction mechanisms.
- Focused heavily on data integrity and smooth cashier workflows with zero lagging.

---

## What I Learned

- **Domain-Driven Modularization:** Structuring large frontend apps by features rather than flat technical layers makes scaling and maintenance significantly easier.
- **Idempotency & State Consistency:** Handling critical checkout states cleanly between the Vue frontend and a transactional Go/PostgreSQL backend.
- **Type Safety Discipline:** Leveraging TypeScript interfaces and strict payload typing across API contracts to catch bugs early.

---

## Future Improvements

- Introduce offline-first capabilities for local network reliability during internet drops.
- Barcode Scanner Integration: Menambahkan dukungan hardware barcode scanner untuk mempercepat proses pencarian sparepart dan checkout kasir tanpa harus mengetik manual.
- Receipt Printing & Exporting: Mengimplementasikan fitur cetak struk langsung via printer thermal lokal (ESC/POS) serta ekspor laporan harian ke format PDF/Excel untuk kebutuhan pembukuan pemilik bengkel.

---

## Quick Start

```bash
# Clone & masuki repository
git clone <repository-url> && cd amigo-client

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env

# Jalankan server lokal
pnpm dev
```
