FROM node:lts-alpine AS runtime
WORKDIR /app

# COPY . .
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN npm install -g pnpm && pnpm ci --frozen-lockfile

RUN pnpm fetch
COPY . .

# RUN pnpm ci

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
# RUN npm run dev

# CMD node ./dist/server/entry.mjs
