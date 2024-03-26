const winston = require('winston');
require('winston-mongodb')
require('express-async-errors');
require('dotenv').config();

module.exports = function () {

  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  );

  process.on('unhandledRejection', (ex) => {
    winston.error('Unhandled Promise Rejection:', ex.message);
  });

  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  winston.add(new winston.transports.MongoDB({
    db: process.env.MONGODB_URL,
    collection: 'logs'
  }));
};