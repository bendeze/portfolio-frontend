---
title: "Modernizing My Engineering Publication Platform: Fast, Minimalist, Content-First"
publishedAt: "2026-03-18"
description: "Why I migrated from a backend database dependency to Git-driven Markdown, adopting Steipete's minimalist architecture and high-performance typography."
tags: ["devlog", "architecture", "webdev", "performance"]
ogImage: "/placeholder_image.png"
---

Welcome to the newly modernized engineering publication! 

For the past few months, I had been running my portfolio and blog backed by a database. While that worked, it introduced latency, unnecessary database operational overhead, and separated my writing from where I spend most of my time: **Git and code editors**.

## The New Architecture

Inspired by Peter Steinberger's [steipete.me](https://github.com/steipete/steipete.me), I redesigned the site around three core pillars:

1. **Local Git-Tracked Markdown**: All technical articles, quick posts, and project architecture case studies live directly inside the repository.
2. **Deterministic Interactive Diagrams**: Fenced `mermaid` and `plantuml` blocks render natively on the client with zero drop-shadow clutter, transparent backgrounds, and sharp monochrome arrows.
3. **Hyper-Focused Typography**: Clean high-contrast typography, dashed hyperlink accents with generous text offset, and a single `#ebcb00` brand accent.

```bash
# Writing a new engineering post is now as simple as:
$ cat <<EOF > content/posts/2026/my-new-post.md
---
title: "Kernel Tuning Notes"
tags: ["linux", "kernel"]
---
Content here...
EOF
```

More deep-dive network engineering and system administration papers are on the way. Stay tuned!
