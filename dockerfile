FROM node:18-alpine

ARG REACT_APP_API_URL

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN VITE_SECRET_TOKEN=${REACT_APP_API_URL} pnpm run build

CMD ["pnpm", "start"]

EXPOSE 3000