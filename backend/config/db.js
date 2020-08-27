/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-non-literal-require */
'use strict';

const mongoose = require('mongoose');
const logger = console.log;

class Database{
  constructor() {
    this.mongoose = mongoose;
  }

  async _connect(port, host, name, opts) {
    return new Promise((resolve, reject) => {
      this.mongoose.Promise = global.Promise;
      this.mongoose.connect(
        `mongodb://${host}:${port}/${name}`,
        { ...opts, useUnifiedTopology: true, useNewUrlParser: true, }
      );
      const { connection } = this.mongoose;

      connection.on('connected', () => {
        logger('Database Connection was Successful');
        return resolve();
      });

      connection.on('error', err => {
        logger(`Database Connection Failed${err}`);
        return reject(err);
      });

      connection.on('disconnected', () =>
        logger('Database Connection Disconnected')
      );

      process.on('SIGINT', () => {
        connection.close();
        logger(
          'Database Connection closed due to NodeJs process termination'
        );

        // eslint-disable-next-line no-process-exit
        process.exit(0);
      });

    });
  }

  async _disConnect() {
    this.mongoose.disconnect();
  }
}

module.exports = new Database();
