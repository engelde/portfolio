FROM node:latest
WORKDIR /app
COPY ./ /app/
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
