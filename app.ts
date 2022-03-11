import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import AppRoutes from './app/routes';
const PORT = process.env.PORT || 8081;
const app = new Koa();
app.use(bodyParser());
app.use(AppRoutes().routes()).use(AppRoutes().allowedMethods());
app.listen(PORT);

console.log(`应用启动成功 端口:${PORT}`);
