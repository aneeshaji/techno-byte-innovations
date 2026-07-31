# TechnoByteInnovations

Company website for TechnoByteInnovations — a software development agency, built with React, TypeScript, and Vite.

## Tech Stack

- **React 19** + **TypeScript** — UI and type safety
- **Vite 7** — build tooling and dev server
- **React Router v7** — client-side routing (`/`, `/services`, `/about`, `/portfolio`, `/contact`, `/privacy-policy`, `/terms-of-service`)
- **Framer Motion** — page transitions and animations
- **React Helmet** — per-page SEO metadata

## Getting Started

Requirements: **Node.js ≥ 20.19** (Vite 7 requirement).

```bash
npm install        # install dependencies
npm run dev        # start the dev server (HMR)
```

## Available Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the Vite dev server            |
| `npm run build`    | Type-check (`tsc -b`) then build to `dist/` |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Run ESLint                           |

## Project Structure

```
public/                 # static assets copied verbatim into dist/ (favicon, robots.txt, sitemap.xml, .htaccess)
src/
  components/           # shared UI components (Navbar, Footer, SEO, PageTransition, …)
  pages/                # route-level page components
  utils/                # shared helpers and animations
  App.tsx               # router setup
.github/workflows/      # GitHub Actions — deployment to cPanel
```

## Deployment (cPanel via GitHub Actions)

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which:

1. Installs dependencies and builds the site (`npm run build` → `dist/`)
2. Uploads `dist/` to the server's `public_html/` directory over **explicit FTPS** (port 21)

Because the action **mirrors** the remote folder, any files on the server that aren't in `dist/` are deleted on deploy — don't point it at a directory containing files you want to keep.

### One-time setup

**1. cPanel — create an FTP account**

- In cPanel, go to **Files → FTP Accounts → Create FTP Account**.
- Set the account directory to `/public_html` (the account's web root).
- Note the FTP **server hostname**, **username**, and **password**.

**2. GitHub — add repository secrets**

Go to **Settings → Secrets and variables → Actions** and add:

| Secret           | Value                                |
| ---------------- | ------------------------------------ |
| `FTP_SERVER`     | FTP hostname from cPanel             |
| `FTP_USERNAME`   | FTP account username                 |
| `FTP_PASSWORD`   | FTP account password                 |

**3. Deploy**

Push to `main` (or run the workflow manually via **Actions → Deploy to cPanel → Run workflow**). Watch the run under the **Actions** tab, then hard-refresh your site.

### Client-side routing (`.htaccess`)

The site uses `BrowserRouter`, so direct visits to routes like `/services` or `/portfolio` would404 without a rewrite. [public/.htaccess](public/.htaccess) rewrites all non-file/non-directory requests to `index.html` and is copied into `dist/` automatically on every build.

If you deploy to a subfolder instead of the account root, update `server-dir` in the workflow *and* the `RewriteBase` in `.htaccess` to match.
