import { Context } from 'koa';
const Joi = require('joi-i18n-x')(
  require('joi'),
  __dirname + '/../locales/joi',
  'en-US',
);

export default (ctx: Context, next: () => Promise<any>) => {
  ctx.state.joiValidate = (
    data: any,
    schema: any,
    abort: boolean = true,
    allowUnknown: boolean = false,
  ) =>
    Joi.validate(
      data,
      schema,
      { i18n: 'en-US', allowUnknown },
      (error: any, value: any) => {
        ctx.assert(!abort || !error, 400, error);
        return { error, value };
      },
    );
  return next();
};
