import Router = require('koa-router');
import commonRouter from './common';
const COMMOM_PATH = '/api/v1';

export default function() {
  const router = new Router({ prefix: COMMOM_PATH });
  router.use(commonRouter().routes(), commonRouter().allowedMethods());
  return router;
}
