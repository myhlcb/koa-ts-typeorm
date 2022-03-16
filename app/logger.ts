import logger, { format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from 'config';

const LOG_DIR = 'logs';
const POD = (process.env.HOSTNAME || '').substr(28);

const myFormat = format.printf((info: any) => {
  return `${info.timestamp}@${POD}[${info.label}] ${info.level}: ${info.message}`;
});

export const loggerConfig = (category: string = 'app') => {
  logger.configure({
    level: process.env.LOGGER_LEVEL || config.get('logger.level'),
    format: format.combine(
      format.colorize(),
      format.splat(),
      format.label({ label: category }),
      format.timestamp({ format: 'MM/DD HH:mm:ss:SSS' }),
      myFormat,
    ),
    transports: [
      new transports.Console(),
      new DailyRotateFile({
        maxFiles: '14d',
        dirname: LOG_DIR,
        filename: `${category}-error-%DATE%.log`,
        level: 'error',
      }),
      new DailyRotateFile({
        maxFiles: '14d',
        dirname: LOG_DIR,
        filename: `${category}-combined-%DATE%.log`,
      }),
    ],
    exceptionHandlers: [
      new transports.File({
        maxsize: 500,
        dirname: LOG_DIR,
        filename: `${category}-exceptions.log`,
      }),
    ],
  });
};

export default logger;
