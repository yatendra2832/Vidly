const winston = require('winston');
require('winston-mongodb')
require('express-async-errors');
require('dotenv').config();


module.exports = function () {
    winston.level = 'info'; 
    winston.format = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.json()
    );
  
    winston.handleExceptions(
      new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );
  
    process.on('unhandledRejection', (ex) => {
      winston.error('Unhandled Promise Rejection:', ex.message);
    });
  
    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, {
      db: process.env.MONGODB_URL, 
      collection: 'logs' 
    });
  };