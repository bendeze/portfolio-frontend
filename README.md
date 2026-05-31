# Next.js Portfolio Frontend Web Application

Welcome to the frontend application for the Portfolio and Systems Architecture Platform. This React web application is built using Next.js 16, React 19, and Tailwind CSS v4, rendering a high-performance, glassmorphic client-side interface.

---

## Core Technology Stack

- **Framework**: Next.js 16 (App Router with Turbopack compilation support)
- **Library**: React 19 (Server Components, concurrent rendering, and Suspense fallbacks)
- **Styling**: Tailwind CSS v4 and custom HSL/oklch utility styling classes
- **Animations**: Framer Motion 12 (responsive layout animations)
- **Data Querying**: TanStack React Query v5 and Axios (REST API HTTP client)
- **Package Manager**: npm / Node.js 20+

---

## Directory Organization

The codebase is organized using a Feature-First folder architecture. Rather than split files across generic folders, every business domain is self-contained inside a dedicated subdirectory under `features/`:

```text
frontend/portfolio-frontend/
├── app/                      # Next.js file-based page routing system
│   ├── (features)/           # Pages grouped by domain cluster
│   │   ├── blog/             # Blog index page and detailed dynamic slug views
│   │   └── projects/         # Projects index page and detailed dynamic slug views
│   ├── globals.css           # Global Tailwind CSS configurations
│   └── layout.tsx            # HTML Root Layout containing head preconnected link fonts
│
├── features/                 # Decoupled Feature Domains
│   ├── blog/                 # Blog core files (API calls, Zod schemas, UI content and readers)
│   ├── projects/             # Projects core files (API calls, Zod schemas, UI content and readers)
│   └── contact/              # Contact forms, validator constraints, and dispatches
│
├── context/                  # Language Context supporting translations
└── lib/                      # Base axios client mapping and translations schemas
```

For a comprehensive walkthrough of the frontend feature-driven structure, directory specifications, and components layouts, consult the detailed guide at:
👉 https://github.com/P-B37/docs/blob/main/frontend_architecture.md

---

## Setup and Development Guide

### Step 1: Install Node.js Dependencies
Install all required node packages matching the locked dependency tree:
```bash
npm install
```

### Step 2: Configure Environment Variables
Create a `.env.local` file inside the root of the frontend folder and configure the local Django REST API server host URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:8001/api
```

### Step 3: Run the Development Server
Launch the development server:
```bash
npm run dev
```
Open http://localhost:3000 in your browser to see the live application.

### Step 4: Compile Production Build
To test the production compilation and optimization pipeline:
```bash
npm run build
```

---

## Deep Technical Architectures & Mappings

To keep our client-side systems robust and decoupling scalable, several advanced patterns were implemented:

1. **Zod Translation and Decoupling Layer**: Prevents database changes from breaking React components by transforming raw Django REST JSON fields into clean domain representations.
2. **Server-Side MDX Remote Serialization**: Converts custom illustrations (Google Photos, Unsplash) and pre-serializes MDX on the server side using GitHub Flavored Markdown (GFM) for extreme performance.
3. **Double-Spotlight Glow Math**: Calculates real-time mouse coordinate bounding boxes to map smooth Indigo glowing borders.
4. **Debounced Clapping Synchronizer**: Gathers quick clapping events locally and triggers a single, debounced sync update to minimize HTTP payloads.

For full code implementations, detailed mathematical masking stylesheets, and TypeScript configuration guide of these systems, refer to the technical document:
👉 https://github.com/P-B37/docs/blob/main/frontend_architecture.md

---

## REST API Connections Reference

The frontend application connects to the Django REST framework endpoints. To review the JSON response structures, filter query fields (like category slug filters `category__slug`), search parameters, and inquiry payloads, refer to the API Reference Manual:
👉 https://github.com/P-B37/docs/blob/main/api_reference.md
