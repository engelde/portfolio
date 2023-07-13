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

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

Create a production build:

```bash
pnpm build
```

Run the production server:

```bash
pnpm start
```

Deploy with Docker:

```bash
docker build -t portfolio .
docker run --name engelde -p 80:3000 -d portfolio
```
