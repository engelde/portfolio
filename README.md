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

## Message Form

The pipe-room message form is wired for a free Google Forms endpoint. To enable it, create a Google Form with short-answer `Name`, short-answer `Email`, and paragraph `Message` fields, inspect the form HTML to find the three `entry.<id>` names, and set:

```bash
PIPE_ROOM_MESSAGE_FORM_ACTION="https://docs.google.com/forms/d/e/<form-id>/formResponse"
PIPE_ROOM_MESSAGE_NAME_FIELD="entry.<name-id>"
PIPE_ROOM_MESSAGE_EMAIL_FIELD="entry.<email-id>"
PIPE_ROOM_MESSAGE_MESSAGE_FIELD="entry.<message-id>"
NEXT_PUBLIC_PIPE_ROOM_MESSAGE_TURNSTILE_SITE_KEY="<cloudflare-turnstile-site-key>"
PIPE_ROOM_MESSAGE_TURNSTILE_SECRET_KEY="<cloudflare-turnstile-secret-key>"
```

## Asset Credits

Super Mario Bros. 3 and all related character, item, environment, visual, and audio assets are owned by Nintendo. I do not claim ownership of those assets, and this site is not affiliated with, sponsored by, or endorsed by Nintendo.
