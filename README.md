# David Engel's Portfolio Site

This is my portfolio site! The site is a work in progress but feel free to look around.

## Development

Install dependencies:

```bash
npm i
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

Deploy with docker:

```bash
docker build -t portfolio .
docker run --name davideengel -p 80:3000 -d portfolio
```
