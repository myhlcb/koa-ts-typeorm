import { Context } from 'koa';
import * as fs from 'fs';
import {PassThrough} from 'stream'
const pathDir = process.cwd()
// 简单下载
export async function simple(ctx: Context) {

  const file = await fs.readFileSync(`${pathDir}/test.txt`,'utf-8')
  ctx.set({'Content-Disposition':`attachment;filename=test.txt`})
  ctx.body = file
}
// 流式下载
export async function stream(ctx: Context) {
  const file = await fs.createReadStream(`${pathDir}/test.txt`);
  ctx.set({'Content-Disposition':`attachment;filename=test.txt`})
  ctx.body = file
}
// 进度显示
export async function progress(ctx: Context) {
  const { enable } = ctx.query;
  const buffer = await fs.readFileSync(`${pathDir}/test.txt`);
  const stream = new PassThrough();
  const l = buffer.length;
  const count = 4;
  const size = Math.floor(l / count);
  const writeQuarter = (i = 0) => {
    const start = i * size;
    const end = i === count - 1 ? l : (i + 1) * size;
    stream.write(buffer.slice(start, end));

    if (end === l) {
      stream.end();
    } else {
      setTimeout(() => writeQuarter(i + 1), 3000);
    }
  };

  if (!!enable) {
    ctx.set({
      'Content-Length': `${l}`,
    });
  }

  ctx.set({
    'Content-Type': 'plain/txt',
    'Content-Disposition': `attachment; filename=test.txt`,
    Connection: 'keep-alive',
  });
  ctx.body = stream;
  writeQuarter();
}
// 断点续传
function getStartPos(range = '') {
  var startPos = 0;
  if (typeof range === 'string') {
    var matches = /^bytes=([0-9]+)-$/.exec(range);
    if (matches) {
      startPos = Number(matches[1]);
    }
  }
  return startPos;
}

export async function portial(ctx: Context) {
  const range = ctx.get('range');
  console.log(range,1111)
  const start = getStartPos(range);
  const stat = await fs.statSync(`${pathDir}/test.txt`);
  const stream = fs.createReadStream(`${pathDir}/test.txt`, {
    start,
    highWaterMark: Math.ceil((stat.size - start) / 4),
  });

  stream.on('data', (chunk) => {
    console.log(`Readed ${chunk.length} bytes of data.`);
    stream.pause();
    setTimeout(() => {
      stream.resume();
    }, 3000);
  });

  console.log(`Start Pos: ${start}.`);
  if (start === 0) {
    ctx.status = 200;
    ctx.set({
      'Accept-Ranges': 'bytes',
      'Content-Length': `${stat.size}`,
    });
  } else {
    ctx.status = 206;
    ctx.set({
      'Content-Range': `bytes ${start}-${stat.size - 1}/${stat.size}`,
    });
  }

  ctx.set({
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': `attachment; filename=test.txt`,
    Connection: 'keep-alive',
  });
  ctx.body = stream;
}