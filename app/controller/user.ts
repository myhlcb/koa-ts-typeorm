import { Context } from 'koa';
import {User} from '../entities/user'
export async function users(ctx: Context) {
  const list = await User.find()
  ctx.body = {list};
}
