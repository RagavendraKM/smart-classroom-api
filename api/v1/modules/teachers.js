const log = require('winston');
var ctrls = require('../controllers');
var models = require('../models');

module.exports = {
    /**
     * Creates a teacher
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     * @return {object}        Populates res.locals with newly created teacher document
     */
    create: (req, res, next) => {
        log.info('Module - Create Teacher');
        var teacher = new models.teachers(req.body);
        ctrls.mongodb.save(teacher, (err, result) => {
            if (err) {
                let err = new Error('Oops something went wrong!');
                err.status = 500;
                next(err);
                return;
            }
            log.info('Successfully created teacher');
            res.locals = result;
            next();
        });
    }
};
