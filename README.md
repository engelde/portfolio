# David Engel's Portfolio Site

This is my portfolio site! The site is a work in progress but feel free to look around.

![Preview](/resources/images/preview.png)

## Getting Started

Install dependencies:

```bash
npm i
```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

Deploy with Docker:

```bash
docker build -t portfolio .
docker run --name davideengel -p 80:3000 -d portfolio
```
