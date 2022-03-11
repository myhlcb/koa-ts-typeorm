import { Context } from 'koa';
import _ from 'lodash';
const Joi = require('joi');
export async function convertToPng(ctx: Context) {
  console.log(_.get(ctx.req, 'files'));
}
