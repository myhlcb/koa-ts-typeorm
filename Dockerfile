FROM node:17-slim AS builder
WORKDIR /src
COPY package.json yarn.lock ./
#镜像的操作指令
RUN yarn install 
COPY . .
RUN yarn build

FROM node:17-slim 
WORKDIR /node
COPY package.json yarn.lock ./
#镜像的操作指令
RUN yarn install
COPY --from=builder /src/dist ./
RUN mkdir -p ./storage/public/attachment ./storage/attachment ./logs ./tmp

#容器启动时执行指令
CMD  node app.js
