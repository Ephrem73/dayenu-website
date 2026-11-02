# Dayenu website

Website for Dayenu Road and Environment Cleaning Service PLC, exported from Figma Make.

## Run locally

Use Node.js 22.12+ (Node.js 22 recommended) and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Production build

```sh
pnpm build
pnpm preview
```

Deploy the generated `dist/` folder to a static host. The application uses React 19, Vite 8, TypeScript, and Tailwind CSS 4. No application server, database, or environment secrets are required by the current implementation. Navigation uses hash routes (for example `/#/services`).

## Before public launch

- Connect the contact form to an approved inbox or service. It currently validates locally and displays a demonstration confirmation; **messages are not delivered**.
- Confirm company details, article content, and image rights. Photography loads from Unsplash and fonts load from Figma.
- Search indexing is currently disabled in `.figma/make/site.json`, as in the original export. Enable it when the production site is ready.
- Add the intended domain in the selected hosting service and apply the DNS records it provides. No domain has been configured yet.

The original export remains unchanged in Downloads. This repository contains the working copy prepared for GitHub.
