import { Context } from 'koa';

export async function hello(ctx: Context) {
  ctx.body = 'hello world';
}
