FROM node:18-alpine AS deps
WORKDIR /app

# Используем версию yarn из корневого package.json
RUN corepack enable && corepack prepare yarn@4.9.1 --activate

# yarn 2+ по умолчанию работают в режиме PnP и хранят все пакеты кэше (.yarn/cache), не создавая папку node_modules
# Файл .yarnrc.yml задает конфигурацию для хранения зависимостей в node_modules
COPY yarn.lock package.json .yarnrc.yml ./
COPY configs ./configs/

# Сохраняем структуру папок в контейнере для правильного разрешения зависимостей при использовании workspaces
COPY services/admin-panel-ui/package.json services/admin-panel-ui/

# Аналог yarn install --production для работы с workspace
RUN yarn workspaces focus @services/admin-panel-ui --production




FROM deps AS build
# Для возможности запуска скриптов из внутреннего package.json
WORKDIR /app/services/admin-panel-ui
COPY services/admin-panel-ui ./
RUN yarn build




FROM node:18-alpine
WORKDIR /app
EXPOSE 3000

# Для compose (вместо command инструкции можно переключить здесь)
RUN corepack enable && corepack prepare yarn@4.9.1 --activate

COPY --from=build app/services/admin-panel-ui/.next ./.next
COPY --from=build app/services/admin-panel-ui/public ./public
COPY --from=build app/services/admin-panel-ui/package.json ./
COPY --from=deps /app/node_modules ./node_modules

CMD [ "yarn", "start" ]
