# Admin Panel (Monorepo)

Aдмин‑панель ресторана (Next.js) и REST API (NestJS + Prisma + PostgreSQL).

## Содержание

- [Требования к проекту](#требования-к-проекту)
- [Деплой](#деплой)
- [Стек](#стек)
- [Структура проекта](#структура-проекта)
- [Системные требования](#системные-требования)
- [Переменные окружения](#переменные-окружения)
- [Быстрый старт в Docker (dev)](#быстрый-старт-в-docker-dev)
- [Пользователи и роли](#пользователи-и-роли)
- [Prisma Studio](#prisma-studio)
- [Swagger](#swagger)

---

## Требования к проекту

Технические и функциональные требования к проекту описаны в [assignment.md](assignment.md).

## Деплой

Все модули приложения развернуты на [Vercel](https://vercel.com):

- Клиент: [admin-panel-ui-iandyone.vercel.app](https://admin-panel-ui-iandyone.vercel.app/)
- Сервер: [admin-panel-api-iandyone.vercel.app](https://admin-panel-api-iandyone.vercel.app/)

## Стек

- **Frontend**: Next.js 15 (App Router), Material UI, React Query, Next Auth, React Toastify, Formik, Yup, Axios
- **Backend**: NestJS 10, Prisma ORM, Joi, Bcrypt
- **Database**: PostgreSQL 16
- **Infra**: Node 18+, Yarn 4.9.1, Yarn Workspaces, Docker (+Compose), Lefthook, ESLint 9, Git

---

## Структура проекта

```
.
├─ configs/                    # Общие конфиги сервисов
│  ├─ eslint/                  # Базовый конфиг eslint
│  └─ typescript/              # Базовый конфиг typescript
├─ services/
│  ├─ admin-panel-ui/          # Next.js приложение (UI)
│  └─ admin-panel-api/         # NestJS + Prisma (API)
├─ compose.yml                 # основной файл docker compose
├─ compose.override.yml        # дев конфиг (hot reload, volumes, env_file)
└─ package.json                # корневые скрипты и workspaces
```

---

## Системные требования

- **Node.js 18+**
- **Yarn 4+**:
- **Docker** и **Docker Compose** (для dev в контейнерах)
- **PostgreSQL 16** (для запуска локально без Docker)

## Переменные окружения

В корне репозитория необходимо создать файл `.env.local` и задать переменные окружения. Пример заполнения:

```env
DB_PASSWORD=root
DB_NAME=admin_panel
DB_USER=postgres
DB_HOST=postgres

PORT_UI=3000
PORT_API=8080
PORT_DB=5432

API_CONTAINER_NAME=api
API_BASE_PATH=http://${API_CONTAINER_NAME}:${PORT_API}

NEXT_PUBLIC_UI_BASE_PATH=http://localhost:${PORT_UI}
NEXT_PUBLIC_API_BASE_PATH=http://localhost:${PORT_API}

JWT_SECRET=Vp5fhlYoqITEOJIpAmwuOeP8loFCCbzelehFJZPLjlE=
AUTH_SECRET=GJ3g0Qerb0dZQMIApRw3T/trUkSUG+qaZmtZADGzGow=

DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT_DB}/${DB_NAME}
ORIGINS=${NEXT_PUBLIC_UI_BASE_PATH}
```

Для генерации ключей шифрования можно использовать скрипт:

```bash
openssl rand -base64 32
```

---

## Быстрый старт в Docker (dev)

### 1. Подготовка Yarn:

В приложении используется пакетный менеджер `yarn`. Используя `corepack`, требуется подготовить и активировать `yarn` версии `4.9.1`:

```bash
corepack enable && corepack prepare yarn@4.9.1 --activate
```

### 2. Подготовка Node:

Активировать версию `Node`, указанную в `.nvmrc` или новее:

```bash
nvm use
```

### 3. Установка зависимостей:

Установка зависимостей всех сервисов приложения

```bash
yarn
#или
yarn install
```

### 4. Запуск приложения

> ⚠️ Перед выполнением скриптов требуется запустить Docker

При первом запуске приложения необходимо инициализировать базу данных. Скрипт для автоматической инициализации и запуска приложения:

```bash
yarn start:init
```

Или вручную (без запуска приложения):

```bash
yarn db:migrate && db:seed
```

Все последующие запуски в дев режиме осуществляются без предваритальной инициализации, используя скрипт:

```bash
yarn start:dev
```

## Пользователи и роли

### Учетные записи

В приложении реализована ролевая модель доступа. Доступ к отдельным страницам, функционалу и конечным точкам api разграничен для каждой из существующих `пользовательских ролей`:

- ADMIN
- MANAGER
- DELIVERY

После инициализации базы данных в системе будет зарегистрировано по одной учетной записи на каждую роль:

- admin@gmail.com
- manager@gmail.com
- delivery@gmail.com
- deactivated@gmail.com

Пароль для авторизации: `demo_user`.

### Создание новых учетных записей

Создание учетных записей доступно пользователям с ролью `ADMIN`. После заполнения формы создания пользователя на странице `/users` учетная запись станет доступной для авторизации. Пароль, введенный при первой авторизации, будет сохранен, а учетная запись активируется автоматически.

## Prisma Studio

После запуска приложения для ручного управления данными в postgres в проекте подключена интерактивная консоль `Prisma Studio`. Скрипт запуска консоли:

```zsh
yarn db:studio
```

## Swagger

Спецификация OpenAPI — это независимый от языка формат определения, используемый для описания RESTful API. В проект интегрирован модуль, позволяющий генерировать такую ​​спецификацию. Она доступна после запуска приложения по адресу backend-приложения по маршруту `/swagger`, например:
http://localhost:8080/swagger
