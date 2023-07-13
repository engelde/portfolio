# David Engel's Portfolio Site

This is my portfolio site! The site is a work in progress but feel free to look around.

![Preview](/resources/preview.png)

## Getting Started

Install dependencies:

```bash
pnpm i
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
