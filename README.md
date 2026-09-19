# Heronym

A procedural RPG character name generator, built with React + Vite. Names are
assembled at generation time from race-themed syllable/compound fragments
rather than picked from fixed lists, with a complexity slider and a
localStorage-backed "pinned names" list.

## Local development

```bash
npm install
npm run dev
```

This starts a local dev server (usually `http://localhost:5173`) with hot
reload.

## Before you deploy: set the base path

GitHub Pages serves a **project site** (the common case — a repo that isn't
named `<your-username>.github.io`) from a sub-path:

```
https://<your-username>.github.io/<repo-name>/
```

Vite needs to know about that sub-path so the built asset URLs resolve
correctly. Open `vite.config.js` and set `base` to match your repo name
exactly:

```js
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
})
```

If you're deploying to a **user/organization root site**
(`https://<your-username>.github.io/`, from a repo literally named
`<your-username>.github.io`) or to a **custom domain** via a `CNAME` file,
set `base: '/'` instead.

## Option A — GitHub Actions (recommended)

This repo includes `.github/workflows/deploy.yml`, which builds the app and
deploys it automatically on every push to `main`.

1. Push this project to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to `main` (or run the workflow manually from the **Actions** tab).
5. Your site will be live at the URL GitHub Pages shows on that settings
   page, matching the `base` path you set above.

No extra secrets or setup needed — `actions/deploy-pages` handles
authentication automatically.

## Option B — `gh-pages` branch (manual)

If you'd rather deploy by hand instead of via Actions:

```bash
npm run build
npm run deploy
```

`npm run deploy` uses the `gh-pages` package to push the contents of `dist/`
to a `gh-pages` branch. The first time, go to **Settings → Pages** and set
**Source** to **Deploy from a branch**, then pick `gh-pages` / `root`.

## Project structure

```
index.html          Vite HTML entry point
src/
  main.jsx          Mounts <App /> into #root
  App.jsx           UI component (controls, name display, ledgers)
  data.js           Race and class syllable/compound fragment banks
  generator.js       Name-generation logic (syllable fusion, compounds)
  index.css          Theme and layout styles
vite.config.js       Vite config — set `base` here for GitHub Pages
.github/workflows/deploy.yml   GitHub Actions deploy workflow
```

## Adding a race or class

Add an entry to `RACES` or `CLASSES` in `src/data.js` following the shape of
an existing one — no other file needs to change; the dropdowns and generator
pick it up automatically via `RACE_KEYS` / `CLASS_KEYS`.
