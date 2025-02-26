FROM oven/bun:latest
WORKDIR /app
COPY . .
RUN bun install
EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000
CMD ["bun", "run", "index.ts"]
