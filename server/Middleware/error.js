const winston = require('winston');
const { format } = require('winston');


const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }), 
  ],
  format: format.combine(format.timestamp(), format.simple()), 
});

function error(err, req, res, next) {
  
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl, 
    method: req.method, 
  });

  // Provide a generic error response to the client
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred. Our team has been notified and is working to resolve the issue.',
  });

  next(err); 
}

module.exports = { error };
