// unsupported 404 error

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  // Path: middleware/errorMiddleware.js
  
  const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
      next(error);
    }
  
    res
      .status(res.statusCode || 500)
      .json({ message: error.message || 'An unknown error occurred' });
  };
  
  module.exports = { notFound, errorHandler };