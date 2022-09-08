import { Context } from 'koa';
import logger from '../logger';

export default () => {
  return (ctx: Context, next: () => Promise<any>) => {
    return next()
      .then(() => {
        const data: any = (ctx.body && typeof ctx.body === 'object' && ctx.body.constructor === Object)
          ? ctx.body
          : { data: ctx.body };
        if (![200, 201, 204].includes(ctx.status)) {
          data.success = false;
          data.error = {
            code: data.code || ctx.status,
            message: data.message || ctx.message
          };
          if (ctx.status === 404) {
            logger.warn('404req: %s', ctx.path);
          }
        } else {
          data.success = data.success !== false;
        }
      }).catch((err) => {
        if (err.code === 1) {
          ctx.body = { raw: { code: 1, success: true, data: err.data } };
        } else {
          ctx.status = err.status || 500;
          const code = err.code || err.status;
          let message = err.sqlMessage ? 'Internal Server Error' : (err.originalError ? err.originalError.message : err.message) || 'Unknowns error';
          message = message.replace(/\"([a-zA-Z]+)\"/gm, (match: string, p: string) => p);
          const detail = err.detail || err || null;
          const error: any = { code, message, detail };
          ctx.body = { success: false, error };
        }
      }).then(() => {
        if (![301, 302].includes(ctx.status)) {
          const res: any = ctx.body;
          if (res && res.raw) {
            ctx.body = res.raw;
          } else if (!Buffer.isBuffer(ctx.body) && (ctx.type || 'application/json') === 'application/json') {
            const { code: bodyCode, message, error, success, ts, tc, requestId, ...data } = ctx.body as any || { code: 0, message: null, error: null, success: false, ts: 0, tc: 0, requestId: '' };
            const code = error ? error.code || 500000 : bodyCode || 1;
            const msg = error ? error.message : message;
            const output: any = { code, message: msg, ts, tc, error, requestId, success, data };
            if (ctx.headers['trace-tick'] === 'true') {
              output.ticks = ctx.state.ticks;
            }
            ctx.body = output;
          }
          ctx.status = 200;
        }
      });
  };
};