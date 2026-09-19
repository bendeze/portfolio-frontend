# Content Creation Guide & Templates

This directory contains reusable starter templates for creating content across your portfolio:

| Template | Target Folder | Purpose |
| :--- | :--- | :--- |
| [`article-template.md`](./article-template.md) | `content/articles/YYYY/` | In-depth technical guides, architecture deep dives, RFC breakdowns |
| [`post-template.md`](./post-template.md) | `content/posts/YYYY/` | Quick engineering logs, debugging notes, updates, and observations |
| [`project-template.md`](./project-template.md) | `content/projects/` | Showcase case studies with live URLs, GitHub repos, and metric cards |

---

## Quick Start: How to Create New Content

### 1. Creating a New Article
1. Copy [`article-template.md`](./article-template.md) to `content/articles/2026/your-slug-name.md`.
2. Update the frontmatter fields (`title`, `description`, `tags`, `publishedAt`).
3. Write your content in Markdown or MDX.
4. Set `draft: false` (or omit `draft`) when ready to publish.

### 2. Creating a New Blog Post
1. Copy [`post-template.md`](./post-template.md) to `content/posts/2026/your-post-title.md`.
2. Fill in the title, date, tags, and notes.

### 3. Creating a New Project Case Study
1. Copy [`project-template.md`](./project-template.md) to `content/projects/your-project-slug.md`.
2. Configure `architecture`, `metrics`, `liveUrl`, `githubUrl`.

---

## Frontmatter Reference

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Yes | Displayed headline and page title tag |
| `publishedAt` | `string` (YYYY-MM-DD) | Yes | Publication date used for ordering and display |
| `description` | `string` | Yes | SEO summary, card excerpt, and search snippet |
| `tags` | `string[]` | Yes | List of tags used in search and `/tags/[tag]` filtering |
| `draft` | `boolean` | Optional | If `true`, hidden from search and listings |
| `ogImage` / `coverImage` | `string` | Optional | Header card or social preview image path/URL |
| `architecture` | `string` | Projects only | Subtitle showing architectural style |
| `metrics` | `Array<{ label, value }>` | Projects only | Key metric badges displayed on the project page |
| `liveUrl` | `string` | Projects only | Link to live demo / production deployment |
| `githubUrl` | `string` | Projects only | Link to GitHub repository |

---

## Supported Interactive Features

### 1. Images
- **Remote / URL**: `![Diagram Title](https://res.cloudinary.com/.../img.png)`
- **Local (`public/images/`)**: `![Diagram Title](/images/articles/img.png)`

### 2. Mermaid Diagrams
```markdown
\```mermaid
flowchart LR
    Client --> API --> Database
\```
```

### 3. Syntax Highlighting
Code fences support all standard languages (`bash`, `typescript`, `python`, `ini`, `yaml`, `sql`, `go`, `rust`, etc.).
