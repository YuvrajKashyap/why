# Why

A premium single-page personal manifesto built to keep ambition and consequence impossible to ignore.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm start
```

## Deployment

This project is ready to ship on Vercel with no environment variables and no backend services.

Target domain: `why.yuvrajkashyap.com`

Recommended flow:

1. Push the repository to GitHub.
2. Import the repo into Vercel.
3. Deploy with the default Next.js settings.
4. Attach `why.yuvrajkashyap.com` in the Vercel domain settings.

## Content

The page content lives in `data/whyData.ts` so future wording changes stay isolated from the UI.
