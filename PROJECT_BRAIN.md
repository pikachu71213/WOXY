# Project Brain: Woxy Academy Website

Welcome! This is the central repository of knowledge (the "Brain") for the Woxy Academy website. It documents the project architecture, directory structure, features, database schema, and history of edits.

> [!IMPORTANT]
> **Instructions for AI Agents:**
> 1. Do not scan the entire codebase immediately. Read this `PROJECT_BRAIN.md` file first to understand the files, folders, layouts, and logic.
> 2. Every time you make changes to the codebase, you **must** update the **Edit History & Changelog** section at the bottom of this file.

---

## 1. Project Overview & Architecture
Woxy Academy is a premier science and competition classes coaching institute in Bhiwani, Haryana, preparing students for NEET, IIT-JEE, NTSE, NDA, and Foundation classes (6th to 12th).

### Tech Stack:
- **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (React Router v1) on Vite.
- **Languages**: TypeScript, React, HTML5.
- **Styling**: Tailwind CSS v4 (imported via `@import "tailwindcss"` in `src/styles.css`).
- **Database / Backend**: [Supabase](https://supabase.com) (PostgreSQL) for storing contact leads and registrations.
- **State Management**: TanStack Query (React Query) and TanStack Router.

---

## 2. Directory Structure
Here is an overview of the key directories and files:

```bash
WOXY/
├── src/
│   ├── assets/              # Static images (banners, gallery, logos, teacher photos)
│   ├── components/          # Reusable UI components
│   │   ├── BannerStrip.tsx  # Marquee gallery labeled "Our Institute"
│   │   ├── FloatingWidgets.tsx # Floating WhatsApp widget & Admission popup modal
│   │   ├── Header.tsx       # Main navigation header
│   │   ├── Footer.tsx       # Main page footer
│   │   ├── HeroCarousel.tsx # Hero home slider
│   │   └── Logo.tsx         # SVG logo component
│   ├── routes/              # TanStack router page components
│   │   ├── index.tsx        # Homepage (Hero, Stats, Video, About, Courses, CTA)
│   │   ├── about.tsx        # About Us page (Story, Pillars, Directors Profile Cards)
│   │   ├── courses.tsx      # Courses Catalog page
│   │   └── contact.tsx      # Contact us page with interactive form
│   ├── integrations/        # Client integrators
│   │   └── supabase/        # Supabase API client
│   └── styles.css           # Core styling tokens, utility classes, and brand gradients
├── AGENTS.md                # System guidelines for AI pair programmers
└── package.json             # Dependencies and build scripts
```

---

## 3. Database Schema (Supabase)
The website connects to Supabase to capture student registrations.

### Table: `leads`
| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key (auto-generated) |
| `name` | `text` | Full name of the student (Required) |
| `phone` | `text` | Contact phone number (Required) |
| `email` | `text` | Email address (Optional) |
| `program` | `text` | Class / Program selected (e.g., NEET, IIT-JEE, Foundation) |
| `message` | `text` | Custom message/enquiry description |
| `source` | `text` | Source tracking (e.g., `website_contact_form`) |
| `status` | `text` | Status of lead (default is `new`) |
| `created_at` | `timestamp` | Record creation timestamp |

---

## 4. Key Component States & Layouts

### 1. Admission Enquiry Popup (`src/components/FloatingWidgets.tsx`)
- **Behavior**: Automatically triggers and pops up after **5 seconds** on page load (stored in `sessionStorage` to show once per session).
- **Desktop Layout**: A wide split grid layout (`max-w-[860px]`).
  - **Left (5/12 cols)**: Displays the flyer (`registration-flyer.jpg`) with a full-bleed `object-cover` layout. The background is a matching vertical sky-to-royal gradient (`from-[#5ca3e5] to-[#0e498c]`) to prevent black border bars on any viewport.
  - **Right (7/12 cols)**: Enquiry form (Name, Phone, Program select dropdown).
- **Mobile Layout**: Stacked view with the flyer banner restricted to a max-height of `260px` at the top.
- **Footer**: Single-line inline contact widgets with direct phone links for Ashish Sir (`094663 39415`) and Pawan Sir (`8950285289`).

### 2. Video Tour Section (`src/routes/index.tsx`)
- **Location**: Home page, right below the **"Our Institute"** gallery marquee (`BannerStrip`).
- **Features**: Embeds the YouTube video `_XIPyDSehBQ` inside a styled `aspect-video` responsive card. Play parameters: `autoplay=1&mute=1&loop=1` (plays automatically in muted loop mode).

### 3. Directors Profile Cards (`src/routes/about.tsx`)
- **Layout**: Two cards side-by-side (`grid md:grid-cols-2 max-w-4xl mx-auto`).
- **Aesthetics**:
  - Image container aspect ratio set to portrait **`aspect-[4/5]`**.
  - Interactive group hover effects: Image scales up slightly (`group-hover:scale-105`), title text shifts color to primary (`group-hover:text-primary`), and card shadows glow.
  - Flex equal-height settings (`flex-1 flex flex-col`) to keep both profiles matching in height.

---

## 5. Edit History & Changelog

| Date (UTC) | Edited By | Files Modified | Description of Edits / Goals |
| :--- | :--- | :--- | :--- |
| July 3, 2026 | Antigravity | `src/routes/index.tsx` | Embedded muted autoplaying YouTube video tour below "Our Institute" marquee. Changed footer CTA button to "Call Us". |
| July 3, 2026 | Antigravity | `src/components/FloatingWidgets.tsx` | Replaced image in the popup with the three directors flyer (`registration-flyer.jpg`). Reduced popup timing to 5 seconds. |
| July 3, 2026 | Antigravity | `src/components/FloatingWidgets.tsx` | Redesigned the enquiry popup to a wider (`860px`), shorter card. Replaced `object-contain` with `object-cover` and matching blue gradient background to fix black bars. Compressed form padding and aligned contacts inline in footer. |
| July 3, 2026 | Antigravity | `src/routes/about.tsx` | Replaced director photos with high-quality uploads. Redesigned leadership cards to use `aspect-[4/5]` with group hover scale animations and equal height adjustments. |
| July 3, 2026 | Antigravity | `PROJECT_BRAIN.md` | Created the initial PROJECT_BRAIN.md knowledge base file. |
| July 5, 2026 | Antigravity | `src/routes/gallery.tsx`, `src/components/BannerStrip.tsx`, `src/components/HeroCarousel.tsx`, `src/styles.css` | Integrated new images 1-24.jpeg: set 1-15.jpeg in gallery with dynamic columns masonry layout, 15-20.jpeg in Our Institute marquee, and 20-24.jpeg in home banner. Increased banner overlay transparency in `styles.css`. |
| July 5, 2026 | Antigravity | `src/routes/index.tsx`, `src/components/FloatingWidgets.tsx` | Mobile responsiveness updates: stats items stack on mobile, About pillars columns set to 1 column on mobile (grid grid-cols-1 sm:grid-cols-2), and added modal height constraint (max-h-[92vh]) with scroll to prevent keybord layout issues. |
| July 14, 2026 | Antigravity | `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/components/HeroCarousel.tsx`, `src/routes/about.tsx`, `src/routes/courses.tsx`, `src/routes/gallery.tsx`, `src/routes/contact.tsx`, `Public/robots.txt`, `Public/robot.txt`, `src/routes/sitemap[.]xml.ts` | Completed complete website SEO optimization targeting keywords 'best academy in bhiwani', 'best academy in haryana', 'science academy', 'woxy academy', 'science and physics academy'. Added JSON-LD schema, fixed robots.txt and sitemap base url, added title/meta tags and image alt tag improvements. |

