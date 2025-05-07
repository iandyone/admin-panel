FROM node:18-alpine AS deps
WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.9.1 --activate

COPY configs ./configs/
COPY yarn.lock package.json .yarnrc.yml ./
COPY services/admin-panel-api/package.json services/admin-panel-api/

RUN yarn workspaces focus @services/admin-panel-api



FROM deps AS build
WORKDIR /app/services/admin-panel-api
COPY services/admin-panel-api ./
RUN yarn build



FROM node:18-alpine
WORKDIR /app
EXPOSE 8080

RUN corepack enable && corepack prepare yarn@4.9.1 --activate

COPY yarn.lock package.json .yarnrc.yml ./
COPY services/admin-panel-api/package.json services/admin-panel-api/
COPY --from=build app/services/admin-panel-api/dist ./dist/

RUN yarn workspaces focus @services/admin-panel-api --production

CMD [ "node", "dist/src/main" ]
