# ts-koa-starter

这是一个`koa`+`typescript`+`typeorm`+`joi`的起手式(简单的空环境)

## 项目结构

```
.
└── certs              //存放私钥公钥
└── config             //存放配置
└── keys               //存放keys
└── logs               //调试的log文件
└── script             //脚本文件
├── src
│   ├── controller      //controller层
│   ├── db              //db连接池
│   ├── entities        //typeorm建模
│   └── locales         //翻译映射配置
│   ├── middleware      //中间键
│   ├── patch           //脚本
│   ├── resources       //静态资源
│   └── routes          //路由
│   ├── schemas         //mongo建模
│   ├── services        //service层
│   ├── test            //测试
│   └── workers         //定时任务
│   ├── constants.ts    //配置
│   └── util.ts         //配置
│   └── index.ts        //起步
└── test               //mock文件
├── ecosystem.config.js //pm2配置
├── nodemon.json        //nodemon配置
├── package.json
└── tsconfig.json
└── .dockerfile
└── .gitignore
└── .gitlab-ci.yaml

```

## 使用

- git clone https://github.com/Vibing/ts-koa-starter.git
- yarn 或者 npm i
- yarn start 或 npm start
- 在浏览器中开打`localhost:3000`

### 打包

- yarn build 或 npm run build

### 生产环境启动

- 生产环境使用 pm2 启动 可以达到负载均衡 执行：yarn pro 或 npm run pro （生产环境端口默认：8080）

## 友情链接

- Koa2 [Koa (koajs) -- 基于 Node.js 平台的下一代 web 开发框架 \| Koajs 中文文档](https://koa.bootcss.com/)
- Typescript [TypeScript 中文网 · TypeScript——JavaScript 的超集](https://www.tslang.cn/)
