# lc-rating backend

This directory contains the Cloudflare Worker used for GitHub login and cloud
sync. The Worker stores user data in the `LC_RATING_DATA` KV namespace.

## One-time setup

1. Create a GitHub OAuth App:
   - Homepage: `https://<user>.github.io/lc-rating`
   - Callback: `https://lc-rating-backend.<your-subdomain>.workers.dev/api/callback`
2. Log in to Cloudflare:

   ```bash
   pnpm --filter lc-rating-backend exec wrangler login
   ```

3. If this is a new deployment, create a KV namespace and put its ID in
   `wrangler.jsonc`:

   ```bash
   pnpm backend:setup
   ```

4. For automatic deployment, add these GitHub Actions secrets:
   - `CLOUDFLARE_API_TOKEN` — scoped to Workers deployment for this account.
   - `CLOUDFLARE_ACCOUNT_ID` — the Cloudflare account ID.
   - `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `JWT_SECRET` — the Worker
     secret values.

   The workflow writes the three Worker secrets during deployment. They are
   never stored in the repository.

   For a manual-only deployment, set the Worker secrets with Wrangler instead:

   ```bash
   pnpm --filter lc-rating-backend exec wrangler secret put GITHUB_CLIENT_ID
   pnpm --filter lc-rating-backend exec wrangler secret put GITHUB_CLIENT_SECRET
   pnpm --filter lc-rating-backend exec wrangler secret put JWT_SECRET
   ```

`ALLOWED_ORIGINS` and the KV binding are configured in `wrangler.jsonc`, which
is the source of truth for deployment configuration.

## Local development and checks

```bash
pnpm backend:dev
pnpm backend:check
```

Local secrets can be placed in an untracked `backend/.dev.vars` file:

```dotenv
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
JWT_SECRET=...
```

## Deployment

The preferred flow is to merge to `main`. The backend workflow deploys when
Worker source or configuration changes. For a manual deployment:

```bash
pnpm backend:deploy
```

The workflow syncs the three Worker secrets on deployment, so GitHub Actions
becomes the source of truth for those values after automation is enabled.

## API

- `GET /api/login/github` — start GitHub OAuth.
- `GET /api/callback` — OAuth callback.
- `GET /api/getprogress` — download user data.
- `POST /api/uploadprogress` — upload user data.
- `GET /api/health` — health check.
