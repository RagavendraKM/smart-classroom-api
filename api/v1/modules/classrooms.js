const log = require('winston');
var ctrls = require('../controllers');
var models = require('../models');

module.exports = {
    /**
     * Validates schema before creating a classroom
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     */
    validateCreate: (req, res, next) => {
        log.info('Module - ValidateCreate Classroom');

        // Validate schema
        log.info('Validating classroom model...')
        var classroom = new models.classrooms(req.body);
        var error = classroom.validateSync();

        if (error) {
            log.error('classroom model validation failed!');
            let err = new Error('Classroom Validation Failed!');
            err.status = 400;
            // Remove stack trace but retain detailed description of validation errors
            err.data = JSON.parse(JSON.stringify(error));
            next(err);
            return;
        }

        log.info('Classroom model has been validated!');
        next();
    },
    /**
     * Creates a classroom
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     * @return {object}        Populates res.locals with newly created classroom document
     */
    create: (req, res, next) => {
        log.info('Module - Create Classroom');
        var classroom = new models.classrooms(req.body);
        ctrls.mongodb.save(classroom, (err, result) => {
            if (err) {
                let err = new Error('Failed creating classroom!');
                err.status = 500;
                next(err);
                return;
            }
            log.info('Successfully created classroom');
            res.locals = result;
            next();
        });
    }
};
