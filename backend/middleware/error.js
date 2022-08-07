const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    //wrong mongodb id error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    
    //mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Dupicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // wrong jwt error
    if (err.name === 'JsonWebTokenError'){
        const message = 'JSON Web Token is invalid, try again';
        err = new ErrorHandler(message, 400);
    }

    // jwt expire error
    if (err.name == 'TokenExpiredError'){
        const message = 'JSON web token is expired, try again'
    }
    
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })

}