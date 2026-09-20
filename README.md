# Modern Developer Portfolio & Engineering Publication Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A modern, high-performance developer portfolio, technical blog, and systems architecture publication platform. Built with **Next.js 16 (App Router + Turbopack)**, **React 19**, **Tailwind CSS v4**, **Three.js WebGL graphics**, and **Framer Motion**.

---

## ✨ Features

- ⚡ **Ultra-Fast Next.js 16 & React 19**: Built with Server Components, Suspense layouts, and Turbopack compiler.
- 🎨 **Sleek Minimalist Dark/Light Mode**: Engineered with `next-themes` and a custom monochrome + `#ebcb00` gold accent design system.
- 📖 **Rich MDX Article & System Reader**:
  - Full support for Markdown, MDX, code syntax highlighting with Shiki, and reading time estimation.
  - Interactive diagram rendering with **Mermaid.js** and **PlantUML**.
  - Dynamic table of contents with scrollspy active heading tracking.
- 🌐 **Internationalization (i18n)**: Seamless instant switching between **English** and **French** with reactive React Context.
- 📱 **Dual-Mode Newsletter & Broadcasts**:
  - Email newsletter subscription with backend sync.
  - WhatsApp broadcast channel integration with direct mobile deep-linking and desktop QR code preview.
- 🌌 **Interactive 3D WebGL Graphics**: Embedded interactive canvas scenes powered by Three.js & `@react-three/fiber`.
- 🔍 **Dynamic Search & Filtering**: Client-side article and project filtering synchronized directly with URL state via `nuqs`.
- 📡 **Automated RSS Feed**: Auto-generated valid RSS 2.0 XML feed at `/rss.xml`.
- ♿ **Accessible & SEO Optimized**: Semantic HTML5, descriptive OpenGraph & Twitter cards, dynamic metadata generation, and keyboard navigation.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) |
| **3D / WebGL** | [Three.js](https://threejs.org/) & [@react-three/fiber](https://r3f.docs.pmnd.rs/) |
| **Content / MDX** | `next-mdx-remote`, `gray-matter`, `rehype-pretty-code`, `shiki`, `mermaid` |
| **State & URL** | [Zustand 5](https://zustand-demo.pmnd.rs/) & [nuqs](https://nuqs.47ng.com/) |
| **Data Fetching** | [TanStack React Query v5](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) & [Tabler Icons](https://tabler-icons.io/) |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm`, `pnpm`, or `bun`

### 1. Clone the Repository

```bash
git clone https://github.com/bonheurNE07/portfolio-frontend.git
cd portfolio-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy the template environment file:

```bash
cp .env.example .env.local
```

Configure your `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Starts the Next.js development server with Turbopack |
| `build` | `npm run build` | Compiles the production build |
| `start` | `npm run start` | Starts the Next.js production server |
| `lint` | `npm run lint` | Runs ESLint checks across the codebase |

---

## 📂 Project Structure

```text
portfolio-frontend/
├── app/                      # Next.js App Router (pages & endpoints)
│   ├── articles/             # Long-form engineering articles
│   ├── posts/                # Short-form development notes
│   ├── projects/             # Systems architecture & project breakdowns
│   ├── rss.xml/              # Auto-generated RSS feed route
│   ├── layout.tsx            # Global Root Layout
│   └── page.tsx              # Home / Landing Page
│
├── components/               # UI Components
│   ├── diagrams/             # Mermaid & Architecture diagram visualizers
│   ├── newsletter/           # Dual-mode subscribe box & WhatsApp channel card
│   ├── reader/               # MDX content reader & table of contents
│   ├── sections/             # Home page sections (Hero, About, Projects, Blog, Contact)
│   └── shared/               # Shared UI elements (Navbar, Footer, Socials, Modals)
│
├── content/                  # MDX & Markdown Articles, Posts, and Projects
│   ├── articles/             # Deep-dive architecture write-ups
│   ├── posts/                # Tech notes & tutorials
│   └── projects/             # Detailed case studies
│
├── context/                  # React Contexts (Language & Translation Context)
├── hooks/                    # Reusable React hooks
├── lib/                      # Utility functions, Axios client, Translation definitions
├── providers/                # Global providers (Theme, React Query)
└── public/                   # Static media (images, QR codes, icons)
```

---

## ✍️ Authoring Content (MDX)

Articles and case studies are stored in `content/` as Markdown/MDX files. Example frontmatter:

```markdown
---
title: "Building Scalable Backend Architectures with Django & Redis"
description: "A comprehensive guide on engineering scalable, event-driven backends."
publishedAt: "2026-03-15"
author: "Emmanuel Bonheur Ndeze"
category: "Backend"
tags: ["Django", "Architecture", "Python", "Redis"]
featured: true
---

# Introduction

Write your content with **Markdown**, MDX components, and code blocks:

```python
def example():
    return "Hello World"
```
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/bonheurNE07/portfolio-frontend/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feat/AmazingFeature`)
5. Open a Pull Request

Please review our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Emmanuel Bonheur Ndeze**

- Website: [bonheur.dev](https://bonheur-ndeze.vercel.app/)
- GitHub: [@bendeze](https://github.com/bendeze)
- LinkedIn: [Emmanuel Bonheur Ndeze](https://www.linkedin.com/in/bonheur-ndeze-bne/)
- Twitter / X: [@ndeze_emmanuel](https://x.com/ndeze_emmanuel)
- WhatsApp Channel: [Join Channel](https://whatsapp.com/channel/0029VbEWMfgEFeXhQ7h6EH2P)
