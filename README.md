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

Build and run with Docker:

```bash
docker build -t engelde/portfolio .
docker run --name portfolio -p 80:3000 -d engelde/portfolio
```

## Asset Credits

Super Mario Bros. 3 and all related character, item, environment, visual, and audio assets are owned by Nintendo. I do not claim ownership of those assets, and this site is not affiliated with, sponsored by, or endorsed by Nintendo.
