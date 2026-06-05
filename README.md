# Why

A single page personal manifesto that shows two lists side by side to reinforce ambition and the cost of staying the same.

## Overview

Why is a minimal, design focused site built around one idea.

Putting two opposing truths in front of me at the same time.

- Why I want to make it  
- Why I don't want to stay the same  

The public surface is still just something I can open and feel instantly. It also has a hidden synced WANT list for personal goals.

## Why I built it

I wanted a place where I could see all the reasons in front of me. Just a personal tool. Shipped publicly because why not.

## What it does

- Renders a single homepage at `/`
- Shows the title "Why"
- Displays two torn paper panels
  - Side by side on desktop
  - Stacked on mobile
- Each panel contains a numbered list
- Uses motion and hover to make the page feel more intentional
- Provides a hidden editable WANT list backed by Supabase

## Features

- Single page experience
- Custom torn paper design
- Dark textured background
- Smooth entrance animations
- Subtle hover interactions
- Responsive layout
- Hidden synced WANT list
- Server-only Supabase writes for WANT list data

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS (v4)
- Framer Motion
- next/font (Manrope, Cormorant Garamond)
- Supabase
- Vercel for hosting
- Domain: why.yuvrajkashyap.com

## Project Structure

```
app/
  api/
  globals.css
  icon.svg
  layout.tsx
  page.tsx

components/
  TornPinnedHero.tsx
  WantListOverlay.tsx

data/
  whyData.ts

lib/
  wantItems.ts

supabase/
  migrations/

package.json
next.config.ts
postcss.config.mjs
eslint.config.mjs
tsconfig.json
README.md
```

## Pages

- `/`
  - Main and only page
  - Built in `app/page.tsx`
  - Renders the full layout through the main component

No additional pages.

API routes:

- `/api/want-items`
  - Lists and creates WANT list items
- `/api/want-items/[id]`
  - Updates and deletes WANT list items

## Components

- TornPinnedHero  
  Main component that renders the full page

- TornPage  
  Internal component used to render each paper panel

- WantListOverlay
  Hidden synced WANT list editor

- RootLayout  
  Sets fonts, metadata, and wraps the app

## Public Manifesto Data

All content lives in:

```
data/whyData.ts
```

- Typed object
- Two sections:
  - want
  - staySame
- Each has a title and an array of items

Content is static and separated from layout.

## WANT List Data

Synced WANT list data lives in the shared Supabase project under:

```
why.want_items
```

User-facing fields:

- name
- notes
- link
- price

The table uses RLS with no client-facing policies. The browser talks to Next route handlers, and those handlers use a server-only Supabase service role key.

## UI Details

- Dark layered background using gradients and textures
- Torn paper edges created with clip path
- Pushpin and tape styling for depth
- Numbered entries for structure
- No navigation or extra UI

## Motion

Built with Framer Motion.

- Title fades and slides in on load
- Panels animate with opacity, position, and slight rotation
- List items animate in with stagger
- Hover adds a small lift and contrast change
- Respects reduced motion preferences

## Responsive Behavior

- One column by default
- Two columns at large screens
- Max width around 1280px
- Fluid typography using clamp
- Clean stacking on mobile

## Implementation Notes

- Tailwind v4 with CSS first setup
- No tailwind config file
- Uses @tailwindcss/postcss
- React compiler enabled in next config
- No external images, textures are generated with gradients and SVG
- Requires server-only Supabase env vars for WANT list syncing
- No auth layer

## Local Development

Install dependencies:

```
npm install
```

Run the app:

```
npm run dev
```

Open:

```
http://localhost:3000
```

For WANT list syncing, create `.env.local` from `.env.example` and set:

```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` with a `NEXT_PUBLIC_` prefix.

## Production

Build:

```
npm run build
```

Start:

```
npm start
```

## Deployment

- Push to GitHub
- Import into Vercel
- Deploy with default settings
- Add the server-only Supabase environment variables in Vercel
- Attach custom domain

## Domain

```
why.yuvrajkashyap.com
```

## What this is not

- Not a SaaS
- Not a dashboard
- Not a notes app
- Not multi page
- Not user based

It is just a focused page.

## Design Philosophy

This project is about clarity, not features.

Everything is stripped down to:
- what I want
- what I refuse

The goal was to make something that hits immediately.

## Status

Live

## License

Personal project
