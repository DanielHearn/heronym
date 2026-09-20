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

## Adding a race or class

Add an entry to `RACES` or `CLASSES` in `src/data.js` following the shape of
an existing one — no other file needs to change; the dropdowns and generator
pick it up automatically via `RACE_KEYS` / `CLASS_KEYS`.
