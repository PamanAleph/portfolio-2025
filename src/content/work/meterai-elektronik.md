---
title: "Meterai Elektronik V3"
description: "Frontend development for an electronic stamp system using Astro + React and DDD architecture"
publishDate: 2024-01-15
tags: ["Astro", "React", "TypeScript", "DDD Architecture", "Frontend Development", "Government Tech"]
projectUrl: "https://metel-user.example.com"
githubUrl: "https://github.com/example/metel-user"
images:
  - src: /assets/project/metel/metel 1.webp
    alt: Metel landing page for public users
    caption: The landing page displaying information and how to use the electronic stamp
  - src: /assets/project/metel/metel 2.webp
    alt: Metel user dashboard after login
    caption: The user interface after logging in to use the electronic stamp service
  - src: /assets/project/metel/metel 3.webp
    alt: One of the Metel admin dashboard pages
    caption: The admin interface for managing the electronic stamp system (separate project)
img_alt: "Screenshot of the Metel application - Frontend with Astro and React"
---

## Project Description

Metel (Electronic Stamp) is a system composed of two separate projects:

- **User Project**: Frontend for public users (landing page + post-login dashboard).
- **Admin Project**: Frontend for system administrators (separate project and repository).

Both projects utilize Astro + React with a Domain-Driven Design (DDD) architecture to ensure scalability, clear boundaries, and maintainability.
The main user flow is: visit landing page → register/login → dashboard → purchase quota → upload PDF → place e-stamp → confirm → download the resulting document.
The main admin flow is: login → summary dashboard → navigate modules (quota management, activity monitoring, statistics) → perform administrative actions.

Technical implementation details are conceptual and non-confidential (without mentioning endpoints, tokens, or internal configurations).

## Technologies Used

- **Frontend Framework**: Astro (island architecture) + React for interactivity
- **Language**: TypeScript
- **Architecture**: Domain-Driven Design (DDD) + clean boundaries
- **Styling**: Tailwind CSS
- **State Management**: Zustand (global state across components/inter-island)
- **Build Tool**: Vite (via Astro)
- **Package Manager**: npm

## Key Features

### 1. User Project (Separate Repository)

- **Landing Page**: Information and guides on using the e-stamp.
- **User Authentication**: Registration, login, password recovery (without API details).
- **Quota Purchase**: Flow for purchasing quota via a payment gateway (simplified in the UI).
- **Stamping Process**: Upload PDF, interactive viewer to place the digital stamp, process confirmation.
- **Transaction & Document History**: View history and download stamped documents.

#### User Flow (simplified, without API)

1.  Login/register → access dashboard.
2.  Purchase quota → complete payment.
3.  Upload PDF in the “Stamping” menu.
4.  Place the visual e-stamp in the viewer.
5.  Confirm → system processes → download the result from history.

### 2. Admin Project (Separate Repository)

- **Quota Management**: Create/view/manage quota allocation per user/entity.
- **Activity Monitoring**: Track service usage to identify patterns/anomalies.
- **Statistics Dashboard**: Visualize aggregate metrics (usage, performance, revenue) via charts & tables.

#### Admin Flow (simplified, without API)

1.  Login → main dashboard with a summary.
2.  Open “Quota Management” → list + filter data.
3.  Perform administrative actions (e.g., create new quota) via a modal → related data is re-synced in the UI.

### 3. DDD Architecture Implementation

- **Domain Separation**: Entities & value objects (e.g., User, Document, Quota) are defined in the domain; the UI does not directly depend on infrastructure details.
- **Application Layer**: Hooks/services/use-cases orchestrate logic and state (e.g., quota purchase, stamping).
- **Infrastructure Layer**: Abstraction for data fetching & external integrations (without mentioning endpoints).
- **UI Layer**: Presentational React components (including a design system & shared components) that interact through the application layer.
- **Shared Components**: Table/form/input/PDF viewer components can be used across projects with clear boundaries.
- **Clean Architecture**: Dependency flow is UI → Application → Domain; the Domain is framework-agnostic.

## Challenges & Solutions

### Challenge 1: Implementing DDD with Astro + React

**Context**: Translating the Domain–Application–Infrastructure layers into a frontend environment based on islands.
**Solution**:

- Strict directory structure: `src/types|schemas` (domain), `src/store|hooks` (application), `src/service` (infrastructure), `src/components` (UI).
- Use Zustand as a single source of truth that can be imported across islands without depending on the component tree.

### Challenge 2: Separating Admin and User Interfaces

**Context**: Different feature needs, release cadences, and access levels required separation while maintaining a consistent interface.
**Solution**:

- Two separate repositories for release autonomy & security.
- A shared design system and shared components to maintain UI consistency.
- A routes-as-proxy pattern (BFF/ACL) on the frontend to simplify integration and maintain boundaries with external systems.

### Challenge 3: Performance Optimization

**Context**: Initial load & interactivity needed to be fast on limited connections; the PDF viewer could be heavy.
**Solution**:

- Leverage Astro islands (zero-JS-by-default), code splitting, and lazy hydration.
- Optimize the PDF viewer with pdf.js + lazy rendering per page/viewport.
- Cache assets on an edge/CDN & use generic invalidation strategies.

## Results & Impact

- **Faster initial performance**: user initial load is estimated to be ~40–50% faster thanks to the island architecture.
- **Responsive admin dashboard**: page load times are ~20–30% better compared to the previous monolithic approach.
- **Improved UX**: smoother flows, a responsive interactive viewer, and concise navigation.
- **Maintainability**: DDD boundaries + shared components accelerate development & new developer onboarding.

## Lessons Learned

- Astro + islands are effective for combining static content with complex interactivity.
- DDD in the frontend requires initial discipline but pays off in scalability & testability.
- A BFF/Proxy on the frontend helps isolate from backend changes without leaking internal details.
- A design system from the start accelerates UI consistency & accessibility across both projects.