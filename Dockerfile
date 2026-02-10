FROM node:22.15.1-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json ./

RUN npm install

FROM base AS build

COPY . .

RUN npx prisma generate

RUN npm run build

# FROM base AS production

# ENV NODE_ENV=production

# WORKDIR /app

# COPY --from=build /app/package.json ./ 

# RUN npm install --omit=dev

# COPY --from=build /app/dist ./dist
# COPY --from=build /app/prisma/migrations ./prisma/migrations

CMD ["node", "dist/main"]