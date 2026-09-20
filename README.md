# Developer Portfolio & Engineering Publication Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A high-performance personal engineering portfolio, systems architecture publication platform, and technical blog built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Three.js WebGL graphics, and Framer Motion.

---

## Key Capabilities

- **Server-Driven Architecture**: Built on Next.js 16 App Router utilizing React Server Components, Suspense boundaries, and Turbopack for optimal load times and minimal client-side JavaScript payloads.
- **Design System & Theme Engine**: Adaptive dark/light mode powered by `next-themes`, built on an architectural monochrome palette accented with `#ebcb00` gold.
- **Interactive Technical Documentation & MDX Reader**:
  - Full support for Markdown and MDX rendering with automated reading time estimation.
  - Syntax highlighting via Shiki with dual-theme code execution styling.
  - Client-side and server-rendered architectural diagrams via Mermaid.js and PlantUML.
  - Scrollspy table of contents tracking active headings in real-time.
- **Internationalization (i18n)**: Instant runtime localization switching between English and French without page reloads.
- **Multi-Channel Distribution**:
  - Email newsletter subscription with asynchronous backend synchronization.
  - WhatsApp broadcast channel integration with mobile deep-linking and desktop QR code preview modal.
- **3D Graphics & Visual Computing**: Interactive WebGL scenes powered by Three.js and `@react-three/fiber`.
- **Search & URL State Synchronization**: Client-side filtering and query state persisted via `nuqs`.
- **Syndication & SEO**: Automated RSS 2.0 XML feed (`/rss.xml`), dynamic OpenGraph metadata, structured JSON-LD data, and accessible semantic HTML.

---

## Technology Stack

| Category | Technology | Role / Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Server Components, Route Handlers, Turbopack |
| **UI Library** | [React 19](https://react.dev/) | Component architecture, Hooks, React Server Actions |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end static typing and strict null checks |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first CSS engine with PostCSS integration |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) | Declarative layout transitions, gesture controls, and scroll triggers |
| **3D / WebGL** | [Three.js](https://threejs.org/) / [R3F](https://r3f.docs.pmnd.rs/) | Interactive background rendering and canvas shaders |
| **MDX Engine** | `next-mdx-remote`, `shiki`, `mermaid` | Technical markdown parser, syntax highlighter, diagram renderer |
| **State Management** | [Zustand 5](https://zustand-demo.pmnd.rs/) & [nuqs](https://nuqs.47ng.com/) | Client state and search param URL serialization |
| **Data Fetching** | [TanStack Query v5](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/) | Server state caching, background refetching, and API integration |
| **Icons** | [Lucide React](https://lucide.dev/) & [Tabler Icons](https://tabler-icons.io/) | SVG icon system |

---

## Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher (LTS recommended)
- **Package Manager**: `npm`, `pnpm`, or `bun`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bonheurNE07/portfolio-frontend.git
   cd portfolio-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your backend endpoint and site metadata:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables Reference

| Variable | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `string` | Base URL for the Django REST Framework API backend | `http://localhost:8000/api` |
| `NEXT_PUBLIC_SITE_URL` | `string` | Canonical domain used for metadata, OpenGraph, and RSS generation | `http://localhost:3000` |

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches the Next.js development server with Turbopack enabled |
| `npm run build` | Produces an optimized production build in `.next/` |
| `npm run start` | Runs the compiled Next.js production server |
| `npm run lint` | Executes ESLint to check for syntax, type, and code quality issues |

---

## Project Structure

```text
portfolio-frontend/
├── app/                        # Next.js App Router (Pages, Layouts, APIs)
│   ├── articles/               # Long-form engineering architecture articles
│   ├── posts/                  # Short-form development logs and notes
│   ├── projects/               # System breakdowns and case studies
│   ├── rss.xml/                # Dynamic RSS 2.0 XML feed endpoint
│   ├── globals.css             # Global Tailwind CSS tokens and base styles
│   ├── layout.tsx              # Root HTML layout and provider wraps
│   └── page.tsx                # Landing and hero presentation page
│
├── components/                 # Modular UI Components
│   ├── diagrams/               # Architecture diagram visualizers (Mermaid, PlantUML)
│   ├── newsletter/             # Dual-mode subscription box and WhatsApp preview
│   ├── reader/                 # MDX reader, heading anchors, and scrollspy TOC
│   ├── sections/               # Home sections (Hero, About, Projects, Blog, Contact)
│   └── shared/                 # Shared UI elements (Navbar, Footer, Modals, Badges)
│
├── content/                    # Markdown & MDX Publication Files
│   ├── _templates/             # Reusable starter templates for content creation
│   ├── articles/               # Deep-dive system design write-ups
│   ├── posts/                  # Quick engineering observations
│   └── projects/               # Project case study data
│
├── context/                    # React Context providers (i18n language context)
├── hooks/                      # Custom React hooks
├── lib/                        # Utility helpers, Axios client, content parsing logic
├── providers/                  # Application providers (Theme, React Query)
└── public/                     # Static assets (images, icons, previews)
```

---

## Content Management (MDX)

Technical articles, dev notes, and case studies are managed as Markdown/MDX files within `content/`.

### Article Schema Example

---
title: "Building Scalable Backend Architectures with Django & Redis"
publishedAt: "2026-03-15"
modifiedAt: "2026-03-16"
description: "A comprehensive guide on engineering scalable, event-driven backends."
tags: ["Django", "Architecture", "Python", "Redis"]
category: "Backend"
featured: true
ogImage: "/images/articles/django-architecture.png"
draft: false
---

# Introduction

Content supports standard Markdown, MDX component embeds, syntax-highlighted code blocks, and diagrams:

```python
def process_event(payload: dict) -> bool:
    # Event processing logic
    return True
```

---

## Quality Assurance & Standards

- **TypeScript**: Strict type checking enforced across all components and utilities.
- **Performance**: High Lighthouse scores for Performance, Accessibility, Best Practices, and SEO.
- **Linting**: ESLint configuration following Next.js core Web Vitals recommendations.

---

## Contributing

Contributions, bug reports, and suggestions are welcome. Please refer to:
- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Maintainer

**Emmanuel Bonheur Ndeze**
Software Engineer & Systems Architect

- Portfolio: [bonheur-ndeze.vercel.app](https://bonheur-ndeze.vercel.app/)
- GitHub: [@bendeze](https://github.com/bendeze)
- LinkedIn: [Emmanuel Bonheur Ndeze](https://www.linkedin.com/in/bonheur-ndeze-bne/)
- Twitter / X: [@ndeze_emmanuel](https://x.com/ndeze_emmanuel)
- WhatsApp Channel: [Engineering Broadcasts](https://whatsapp.com/channel/0029VbEWMfgEFeXhQ7h6EH2P)
