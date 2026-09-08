# CaliforniaApproves.org

React Based Website for CaliforniaApproves.org.

# Development

## Run with Docker + VS Code Dev Container
* Install Docker
* Install Dev Container Extension
* Choose "Open Folder In Dev Container"
* In VSCode Terminal run `npm run dev`

## Run directly with NPM
Install Node

```
npm install
npm run dev
```

# Deployment

The app is hosted using Cloudflare pages. 

Deploy to prod by pushing to `main`.

Pushing to any other branch will automatically push to
`{branch}.californiaapproves.pages.dev`. For example, pushing branch
`alan/something` will deploy to `alan-something.californiaapproves.pages.dev`.

## Environment variables

The newsletter, pledge, and contact forms are protected by Cloudflare Turnstile and
submit through the `functions/api/subscribe.ts` Pages Function, which verifies
the token server-side before forwarding to Mailchimp. Set these on the Pages
project (Settings → Environment variables), for both Production and Preview:

| Variable | Required | Notes |
| --- | --- | --- |
| `TURNSTILE_SECRET_KEY` | yes | Secret key paired with the widget site key in `src/components/common/turnstile.tsx`. |
| `TURNSTILE_ALLOWED_HOSTNAMES` | no | Comma-separated hostname allowlist. Defaults to `californiaapproves.org,www.californiaapproves.org` plus any `*.californiaapproves.pages.dev` preview. |
| `ENVIRONMENT` | no | Set to `production` on the prod deployment. Any other value also accepts `localhost` Turnstile tokens. |

For local testing of the Function, run `npm run build` then
`npx wrangler pages dev dist`, with `TURNSTILE_SECRET_KEY` in a git-ignored
`.dev.vars` file.
