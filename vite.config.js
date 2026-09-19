import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves a project site from https://<user>.github.io/<repo>/,
// so the app has to know it isn't living at the domain root. Change the
// string below to match your repository name exactly (case-sensitive).
//
// - Deploying to https://<user>.github.io/<repo>/  -> base: '/<repo>/'
// - Deploying to https://<user>.github.io/ (a user/org root site)
//   or to a custom domain via CNAME               -> base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/heronym/',
})
