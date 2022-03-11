const multer = require('koa-multer');
import path from 'path';
import {
  ATTACHMENT_SIZE_LIMIT,
  ATTACHMENT_IMAGE_MIME,
  ATTACHMENT_DOCUMENT_MIME,
  ATTACHMENT_VIDEO_MIME,
} from '../constants';

export default multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: ATTACHMENT_SIZE_LIMIT },
  fileFilter: (req: any, file: any, callback: any) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (
      ![
        ...ATTACHMENT_IMAGE_MIME,
        ...ATTACHMENT_DOCUMENT_MIME,
        ...ATTACHMENT_VIDEO_MIME,
      ].includes(ext)
    ) {
      return callback(new Error('Unsupported file format'), false);
    }
    callback(null, true);
  },
});
