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

To exercise a real submission you need Wrangler, which runs `src/worker/`
alongside the built assets:

```
npm run build
npx wrangler dev
```

That serves on <http://localhost:8787>. There is no hot reload for the
assets — re-run `npm run build` after each change.

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

The app is hosted on Cloudflare Workers with static assets: `./dist` is
served directly, and anything that doesn't match a file there is handled by
`src/worker/index.ts` (see `wrangler.jsonc`). 

Deploy to prod by pushing to `main`.

Pushing to any other branch creates a preview deployment. Preview hostnames
have to be covered by the Turnstile hostname allowlist or every form submission
is rejected with a 403 — `*.workers.dev` passes by default; set
`TURNSTILE_ALLOWED_HOSTNAMES` if previews are served from anywhere else.

## Environment variables

The newsletter, pledge, and contact forms are protected by Cloudflare Turnstile
and submit through `/api/subscribe` (`src/worker/subscribe.ts`), which verifies
the token server-side before forwarding to Mailchimp. Set these on the Worker
(Settings → Variables and Secrets), for both production and preview:

| Variable | Required | Notes |
| --- | --- | --- |
| `TURNSTILE_SECRET_KEY` | yes | Secret key paired with the widget site key in `src/components/common/turnstile.tsx`. |
| `TURNSTILE_ALLOWED_HOSTNAMES` | no | Comma-separated hostname allowlist. Defaults to `californiaapproves.org,www.californiaapproves.org` plus any `*.workers.dev` preview. |
| `ENVIRONMENT` | no | Any value other than `production` also accepts `localhost` Turnstile tokens. Note that **unset** counts as `production`, so local runs must set it explicitly. |

