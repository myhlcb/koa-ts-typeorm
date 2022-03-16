import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import AppRoutes from './app/routes';
import joi from './app/middleware/joi';
import respHandle from './app/middleware/respHandle';
const PORT = process.env.PORT || 8081;
const app = new Koa();
app.use(bodyParser());
app.use(joi);
app.use(respHandle());
app.use(AppRoutes().routes()).use(AppRoutes().allowedMethods());
app.listen(PORT);

console.log(`应用启动成功 端口:${PORT}`);
