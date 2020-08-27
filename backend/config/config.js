'use strict';

module.exports = {
  app : {
    name                : process.env.APP_NAME,
    port                : process.env.APP_PORT || 8000,
    environment         : process.env.APPLICATION_ENV,
    logpath             : process.env.LOG_PATH,
    JWT_SECRET          : process.env.JWT_SECRET || 'hakunmatata',
    FRONTEND_SERVER_URL :
      process.env.FRONTEND_SERVER_URL || 'http://localhost:3000',
    TIMEOUT : 120000,
  },
  mongo : {
    port   : process.env.DB_PORT,
    host   : process.env.DB_HOST,
    name   : process.env.DB_NAME,
    user   : process.env.DB_USER,
    pass   : process.env.DB_PASS,
    authdb : process.env.DB_AUTH_DB
  },
  application_logging : {
    info_file  : process.env.INFO_LOG_PATH || 'logs/info.log',
    error_file : process.env.ERROR_LOG_PATH || 'logs/error.log',
    debug_file : process.env.DEBUG_LOG_PATH || 'logs/debug.log',
    console    : process.env.LOG_ENABLE_CONSOLE || true
  },
};
