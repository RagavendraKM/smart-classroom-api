const log = require('winston');
var ctrls = require('../controllers');
var models = require('../models');

module.exports = {
    /**
     * Creates a goal
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     * @return {object}        Populates res.locals with newly created goal document
     */
    create: (req, res, next) => {
        log.info('Module - Create goal');
        var goal = new models.goals(req.body);
        ctrls.mongodb.save(goal, (err, result) => {
            if (err) {
                let err = new Error('Oops something went wrong!');
                err.status = 500;
                next(err);
                return;
            }
            log.info('Successfully created goal');
            res.locals = result;
            next();
        });
    }
};