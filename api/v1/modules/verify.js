const log = require('winston');

module.exports = {
    /**
     * Verifies request body exists
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     */
    body: (req, res, next) => {
        if (!req.body || (Object.keys(req.body).length === 0 && req.body.constructor === Object)) {
            let err = new Error('Empty or invalid payload!');
            err.status = 400;
            next(err);
            return;
        }
        next();
    }
};
