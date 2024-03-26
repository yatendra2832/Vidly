require('dotenv').config();
const winston = require('winston');
const mongoose = require('mongoose');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  ),

  transports: [
    new winston.transports.Console(), // Logs to console
  ]
});

module.exports = async function () {
  try {
    const dbUrl = process.env.TEST_MONGODB_URL ? process.env.TEST_MONGODB_URL : process.env.MONGODB_URL;
    await mongoose.connect(dbUrl);
    logger.info(`Database connection successfull `);
  } catch (error) {
    logger.error('Database Connection Failed:', error.message);

  }
};