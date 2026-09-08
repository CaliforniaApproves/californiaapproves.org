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

## Testing the forms locally

`npm run dev` is Vite only — it serves the site and hot-reloads, but it does
not run anything in `functions/`. `/api/subscribe` returns a 404 there, so the
newsletter, pledge, and contact forms all fail on submit with "Network error".

To exercise a real submission you need Wrangler, which compiles `functions/`
and serves it alongside the built assets:

```
npm run build
npx wrangler pages dev dist
```

That serves on <http://localhost:8788>. There is no hot reload — re-run
`npm run build` after each change.

Put the secrets in a git-ignored `.dev.vars` file in the repo root:

```
TURNSTILE_SECRET_KEY=<your test secret>
ENVIRONMENT=development
```

`ENVIRONMENT` is not optional locally: without it the Function treats the
request as production and rejects `localhost` Turnstile tokens with a 403
(see the table below). Cloudflare publishes
[test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/)
that always pass or always fail, which are easier than a real widget for
local work.

# Deployment

The app is hosted using Cloudflare pages. 

Deploy to prod by pushing to `main`.

Pushing to any other branch will automatically push to
`{branch}.californiaapproves.pages.dev`. For example, pushing branch
`alan/something` will deploy to `alan-something.californiaapproves.pages.dev`.

## Environment variables

The newsletter, pledge, and contact forms are protected by Cloudflare Turnstile
and submit through the `functions/api/subscribe.ts` Pages Function, which verifies
the token server-side before forwarding to Mailchimp. Set these on the Pages
project (Settings → Environment variables), for both Production and Preview:

| Variable | Required | Notes |
| --- | --- | --- |
| `TURNSTILE_SECRET_KEY` | yes | Secret key paired with the widget site key in `src/components/common/turnstile.tsx`. |
| `TURNSTILE_ALLOWED_HOSTNAMES` | no | Comma-separated hostname allowlist. Defaults to `californiaapproves.org,www.californiaapproves.org` plus any `*.californiaapproves.pages.dev` preview. |
| `ENVIRONMENT` | no | Any value other than `production` also accepts `localhost` Turnstile tokens. Note that **unset** counts as `production`, so local runs must set it explicitly. |

