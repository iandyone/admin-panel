FROM node:18-alpine AS deps
WORKDIR /app

COPY configs ./configs/
COPY yarn.lock package.json .yarnrc.yml ./
COPY services/admin-panel-api/package.json services/admin-panel-api/

RUN corepack enable && corepack prepare yarn@4.9.1 --activate
RUN yarn workspaces focus @services/admin-panel-api 



FROM deps AS build
WORKDIR /app/services/admin-panel-api
COPY services/admin-panel-api ./
RUN yarn build



FROM node:18-alpine
WORKDIR /app
EXPOSE 8080

COPY yarn.lock package.json .yarnrc.yml ./
COPY services/admin-panel-api/package.json services/admin-panel-api/package.json
COPY --from=build app/services/admin-panel-api/dist ./services/admin-panel-api/dist/

RUN corepack enable && corepack prepare yarn@4.9.1 --activate
RUN yarn workspaces focus @services/admin-panel-api --production

CMD [ "yarn", "workspace", "@services/admin-panel-api", "start:prod" ]
