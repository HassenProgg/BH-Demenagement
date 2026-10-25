# BH Déménagement

French-language website for a moving service in Tunisia, built with React, TypeScript and Vite. Includes service information, a photo gallery, telephone and WhatsApp contact links, and a quote request form.

## Development

Use Node.js 22 or later.

```sh
npm ci --include=dev
npm run dev
```

```sh
npm run build
npm run preview
npm test
```

The production frontend is generated in `dist/`. Vite's development and preview servers do not run the backend function.

## Quote delivery

The browser posts to `/api/quote`. A Cloudflare Pages Function validates the request and sends it to Telegram. Credentials stay on the server; requests and tokens are not logged by the application. The form reports success only after delivery succeeds.

Set these **encrypted secrets** on the Cloudflare Pages project before deployment:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Never prefix these with `VITE_`. Revoke any previously exposed bot token through Telegram's BotFather before configuring its replacement. Local backend secrets belong in an ignored `.dev.vars` file.

## Deployment

Build with `npm ci --include=dev && npm run build`. Deploy from the project root with Cloudflare Wrangler so that both `dist/` and `functions/` are included:

```sh
npx wrangler pages deploy dist --project-name bhdemenagement
```

Select the project's production branch when deploying to production. Dashboard drag-and-drop uploads do not compile Pages Functions. A Render static-site deployment can serve the frontend, but cannot run this backend; quote submission requires the Cloudflare deployment.

See [Pages Functions deployment](https://developers.cloudflare.com/pages/functions/deploy/) and [secret bindings](https://developers.cloudflare.com/pages/functions/bindings/#secrets).

## Project structure

- `components/`: interface sections and quote form
- `functions/api/quote.js`: server-side Telegram delivery
- `public/`: website images and search engine files
- `tests/`: backend validation and delivery tests with mocked Telegram calls

## Repository hygiene

Secrets, local configuration, dependency folders, build output and backups are excluded from version control. The Google Ads tag ID and business contact details are intentionally public website information. Keep security credentials out of browser code and Git history.
