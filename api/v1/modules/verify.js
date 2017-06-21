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
    },
    /**
     * Verifies request path params exists
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     */
    params: (req, res, next) => {
        if (!req.params || (Object.keys(req.params).length === 0 && req.params.constructor === Object)) {
            let err = new Error('Empty or invalid parameters in path!');
            err.status = 400;
            next(err);
            return;
        }
        next();
    }
};
