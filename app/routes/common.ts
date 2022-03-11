import Router = require('koa-router');
import * as homeController from '../controller/hello';
import * as convertController from '../controller/convert';
import upload from '../middleware/multer';

export default function() {
  const router = new Router();
  router.get('/hello', homeController.hello);
  router.post('/convert', upload.any(), convertController.convertToPng);
  return router;
}
