import Router = require('koa-router');
import * as homeController from '../controller/hello';
import * as userController from '../controller/user';
import * as downloadController from '../controller/download'
import * as convertController from '../controller/convert';
import upload from '../middleware/multer';

export default function() {
  const router = new Router();
  router.get('/hello', homeController.hello);
  router.get('/users', userController.users);
  router.post('/convertToPng', upload.any(), convertController.convertToPng);
  router.get('/download/simple', downloadController.simple);
  router.get('/download/stream', downloadController.stream);
  router.get('/download/progress', downloadController.progress);
  router.get('/download/portial', downloadController.portial);

  return router;
}
