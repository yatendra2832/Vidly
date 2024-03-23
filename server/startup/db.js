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
    await mongoose.connect(process.env.MONGODB_URL);
    logger.info('Database Connection Successful');
  } catch (error) {
    logger.error('Database Connection Failed:', error.message);
    
  }
};