<div align="center">

![David Engel](/public/images/wordmark/wordmark.svg)

</div>

# David Engel's Portfolio Site

This is my portfolio site! The site is a work in progress but feel free to look around.

![Preview](/resources/preview.png)

## Getting Started

Install dependencies:

```bash
pnpm i
```

Git hooks (formatting, commit message linting and a pre-push typecheck) are installed by
[lefthook](https://lefthook.dev) during `pnpm i`. If this clone previously used husky, point git
back at its default hooks directory first:

```bash
git config --unset core.hooksPath && pnpm exec lefthook install
```

## Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

Build and run the production server:

```bash
pnpm build
pnpm start
```

Build and run with Docker. Public `NEXT_PUBLIC_*` values are baked in at build time, and server-only secrets are passed when the container starts:

```bash
docker build -t engelde/portfolio \
  --build-arg NEXT_PUBLIC_POSTHOG_KEY=... \
  --build-arg NEXT_PUBLIC_POSTHOG_HOST=... \
  --build-arg NEXT_PUBLIC_TURNSTILE_SITE_KEY=... \
  .
docker run --name portfolio -p 80:3000 --env-file .env.production -d engelde/portfolio
```

## Asset Credits

Super Mario Bros. 3 and all related character, item, environment, visual, and audio assets are owned by Nintendo. I do not claim ownership of those assets, and this site is not affiliated with, sponsored by, or endorsed by Nintendo.
