# Intelldev — Netlify-ready static website

This folder is a **standalone static website**. It contains no Manus runtime package, no Manus URLs, no database dependency, no authentication dependency, and no server-only requirement. Local brand pictures and the Manrope / Space Grotesk font files are stored in `assets/`; all site behavior uses only `app.js`.

## Deploy to Netlify

Create a GitHub repository from the contents of this folder, then import that repository at [Netlify](https://app.netlify.com/start). Choose the repository, leave the build command empty, and set the publish directory to `.`. Netlify will serve the root `index.html` and local `assets/` directory directly.

Netlify provides HTTPS automatically for the deployed site and custom domains. Confirm that the production domain matches the canonical URL in `index.html`, `robots.txt`, and `sitemap.xml`.

## Contact form behavior

The form validates in the browser and submits project details to Formspree, which forwards submissions to the configured email destination. The site remains serverless and portable.

## Local preview

You can open `index.html` directly in a browser. For a local HTTP preview, use any static file server, for example `npx serve .`.
