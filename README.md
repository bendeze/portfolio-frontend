# Next.js Portfolio Frontend Web Application

Welcome to the frontend application for the Portfolio and Systems Architecture Platform. This React web application is built using Next.js 16, React 19, and Tailwind CSS v4, rendering a high-performance, glassmorphic client-side interface that is responsive, accessible, and fast.

---

## Core Technology Stack

- **Framework**: Next.js 16 (App Router with Turbopack compilation support)
- **Library**: React 19 (Server Components, concurrent rendering, and Suspense fallback layouts)
- **Styling**: Tailwind CSS v4 (incorporating modern CSS features and CSS-first configuration)
- **3D & WebGL**: `@react-three/fiber` & `three` (fueling interactive 3D elements)
- **Animations**: Framer Motion 12 (rendering interactive micro-animations and smooth layout transitions)
- **State Management**: Zustand 5 (local store state) and nuqs (type-safe URL search parameters)
- **Forms & Validation**: React Hook Form 7 coupled with Zod resolvers
- **Data Querying**: TanStack React Query v5 and Axios (robust client-side caching and API fetching)

---

## Directory Organization

The codebase utilizes a **Feature-First folder architecture**. Rather than splitting related business logic across generic folders, every domain is self-contained inside a dedicated subdirectory under `features/`:

```text
frontend/portfolio-frontend/
├── app/                      # Next.js file-based page routing system
│   ├── (features)/           # Pages grouped by domain cluster
│   │   ├── blog/             # Blog index page and detailed dynamic slug views
│   │   └── projects/         # Projects index page and detailed dynamic slug views
│   ├── globals.css           # Global Tailwind CSS configurations and base rules
│   ├── layout.tsx            # HTML Root Layout containing head configurations and fonts
│   └── page.tsx              # Main home/landing page
│
├── features/                 # Decoupled Feature Domains
│   ├── blog/                 # Blog core files (API calls, Zod schemas, UI components, readers)
│   ├── projects/             # Projects core files (API calls, Zod schemas, components, details)
│   └── contact/              # Contact forms, validator constraints, and submission logic
│
├── components/               # Global / shared UI components (navbar, layout wrapper, buttons)
├── context/                  # Language Context supporting multi-lingual translations
├── hooks/                    # Reusable custom React hooks
├── lib/                      # Common helpers, base axios client mapping, and translation schemas
├── providers/                # Global contexts (React Query Provider, Theme Provider)
└── public/                   # Static assets (images, icons, vectors)
```

For a comprehensive walkthrough of the frontend feature-driven structure, directory specifications, and component layouts, consult the detailed guide at:
👉 [frontend_architecture.md](file:///d:/PRO/my-portfolio/docs/frontend_architecture.md)

---

## Setup and Local Development Guide

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
Launch the development server with Turbopack compilation:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the live application.

### Step 4: Compile Production Build
To test the production compilation, bundle optimizations, and static pre-rendering:
```bash
npm run build
```
Once successfully built, run the optimized production bundle locally:
```bash
npm run start
```

---

## Advanced Client-Side Engineering

Several advanced patterns have been engineered to ensure accessibility, extreme performance, and smooth interactivity:

1. **Zod Translation & Decoupling Layer**: Prevents API response updates from breaking UI components by transforming raw Django REST JSON fields into clean, strongly-typed domain representations on the frontend.
2. **Double-Spotlight Glow Interactivity**: Implements real-time mouse coordinate trackers using CSS variables and Framer Motion to map responsive, premium indigo glowing borders on interactive cards.
3. **Multi-Lingual Translation & Search State**: Employs an ultra-fast translation framework backed by React Context for seamless English/French language toggling, coupled with `nuqs` to synchronize client-side UI states directly with the browser address bar.
4. **Three.js Canvas Integration**: Integrates WebGL visual environments using React Three Fiber to build interactive, premium 3D graphics that adapt smoothly across mobile and desktop devices.
5. **Robust Form Dispatching**: Leverages React Hook Form and asynchronous background fetchers to capture user feedback, record data backups safely in the database, and trigger instant emails.

For full code implementations, detailed mathematical masking stylesheets, and TypeScript configuration guides of these systems, refer to the technical document:
👉 [frontend_architecture.md](file:///d:/PRO/my-portfolio/docs/frontend_architecture.md)

---

## REST API Connections Reference

The frontend application connects to Django REST framework endpoints. To review the JSON response structures, filter query fields (like category slug filters `category__slug`), search parameters, and inquiry payloads, refer to the API Reference Manual:
👉 [api_reference.md](file:///d:/PRO/my-portfolio/docs/api_reference.md)
