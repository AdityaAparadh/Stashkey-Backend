FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

EXPOSE 3000 

ENV NODE_ENV=production
ENV PORT=3000
CMD ["bun", "run", "index.ts"]
