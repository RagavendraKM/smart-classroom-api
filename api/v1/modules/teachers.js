const log = require('winston');
var ctrls = require('../controllers');
var models = require('../models');

module.exports = {
    /**
     * Validates schema before creating a teacher
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     */
    validateCreate: (req, res, next) => {
        log.info('Module - ValidateCreate Teacher');

        // Validate schema
        log.info('Validating teacher model...')
        var teacher = new models.teachers(req.body);
        var error = teacher.validateSync();

        if (error) {
            log.error('Teacher model validation failed!');
            let err = new Error('Teacher Validation Failed!');
            err.status = 400;
            // Remove stack trace but retain detailed description of validation errors
            err.data = JSON.parse(JSON.stringify(error));
            next(err);
            return;
        }

        log.info('Teacher model has been validated!');
        next();
    },
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
