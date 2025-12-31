const { errorResponse } = require('../utils/response.js');

const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);
  
  if (err.name === 'ValidationError') {
    return errorResponse(res, 'Validation failed', 422, err.errors);
  }

  return errorResponse(res, err.message || 'Internal Server Error', 500);
};

module.exports = errorHandler;