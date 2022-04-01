import { createConnection, getConnection } from 'typeorm';
import config from 'config';
import { User } from '../entities/user';

const MYSQL_CONF: any = config.get('mysqlConf');
export const connectMysqlDatabase = async (cb: any = null) => {
    const mysqlOpts = {
      ...MYSQL_CONF,
      type: 'mysql',
      maxQueryExecutionTime: 2000,
      synchronize: false,
      supportBigNumbers: true,
      bigNumberStrings: true,
      entities: [
        User,
      ]
    };
    return await createConnection(mysqlOpts)
      .then(async () => {
        console.log('mysql established');
        if (cb) {
          await cb();
        }
      })
      .catch((error) => {
        console.error('mysql Error: %O', error);
      });
  };