# Contributing Guidelines

Thank you for your interest in contributing to this project! We welcome contributions of all kinds: bug fixes, new features, documentation improvements, and design enhancements.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Message Conventions](#commit-message-conventions)

---

## 📜 Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## 🛠️ How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues to ensure it hasn't already been reported. When creating an issue, please include:
- A clear and descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Your browser, OS, and Node version

### Suggesting Features

Feature requests are always appreciated! Please provide:
- A clear description of the proposed feature
- The motivation and use case behind the feature
- Any relevant mockups or code samples

### Pull Requests

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/<your-username>/portfolio-frontend.git
   cd portfolio-frontend
   ```
3. **Create a new branch** with a descriptive name:
   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
4. **Make your changes** following the coding standards.
5. **Test your code**:
   ```bash
   npm run build
   npx tsc --noEmit
   npm run lint
   ```
6. **Commit your changes** using [Conventional Commits](#commit-message-conventions):
   ```bash
   git commit -m "feat(section): add interactive animation"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feat/your-feature-name
   ```
8. **Open a Pull Request** against the `main` branch with a clear description of your changes.

---

## 💻 Development Setup

1. **Node.js**: Ensure you have Node.js `>=20.x` installed.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment configuration**:
   ```bash
   cp .env.example .env.local
   ```
4. **Start local server**:
   ```bash
   npm run dev
   ```

---

## 🎨 Coding Standards

- **TypeScript**: Strict type checking. Avoid `any` where possible.
- **Components**: Use React Server Components by default; add `"use client"` only when interactive state, effects, or browser APIs are required.
- **Styling**: Use Tailwind CSS utility classes and design tokens defined in `app/globals.css`.
- **Accessibility**: Ensure all interactive elements have appropriate ARIA attributes, semantic HTML tags, and keyboard focus states.
- **Clean Code**: Keep components modular, focused, and reusable.

---

## 📝 Commit Message Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

| Type | Description | Example |
| :--- | :--- | :--- |
| `feat` | A new feature | `feat(newsletter): add WhatsApp channel QR code` |
| `fix` | A bug fix | `fix(reader): resolve table of contents scroll offset` |
| `docs` | Documentation changes | `docs: update setup guide in README` |
| `style` | Code formatting or UI styling | `style: improve dark mode border contrast` |
| `refactor` | Code refactoring without feature changes | `refactor: extract reusable modal component` |
| `perf` | Performance optimization | `perf: optimize Three.js canvas render loop` |
| `chore` | Maintenance tasks | `chore: update dependencies` |

---

Thank you for contributing! 🚀
