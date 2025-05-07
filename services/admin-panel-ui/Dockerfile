FROM node:18-alpine AS deps
WORKDIR /app

COPY configs ./configs/
COPY yarn.lock package.json .yarnrc.yml ./
COPY services/admin-panel-ui/package.json services/admin-panel-ui/

RUN corepack enable && corepack prepare yarn@4.9.1 --activate
RUN yarn workspaces focus @services/admin-panel-ui 



FROM deps AS build
WORKDIR /app/services/admin-panel-ui
COPY services/admin-panel-ui ./
RUN yarn build



FROM node:18-alpine
WORKDIR /app
EXPOSE 3000

COPY yarn.lock package.json .yarnrc.yml ./
COPY services/admin-panel-ui/package.json services/admin-panel-ui/package.json
COPY --from=build app/services/admin-panel-ui/.next ./services/admin-panel-ui/.next
COPY --from=build app/services/admin-panel-ui/public ./services/admin-panel-ui/public

RUN corepack enable && corepack prepare yarn@4.9.1 --activate
RUN yarn workspaces focus @services/admin-panel-ui --production

CMD [ "yarn", "workspace", "@services/admin-panel-ui", "start" ]
