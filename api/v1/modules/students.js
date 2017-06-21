const log = require('winston');
var ctrls = require('../controllers');
var models = require('../models');

module.exports = {
    /**
     * Validates schema before creating a student
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     */
    validateCreate: (req, res, next) => {
        log.info('Module - ValidateCreate Student');

        // Validate schema
        log.info('Validating student model...')
        var student = new models.students(req.body);
        var error = student.validateSync();

        if (error) {
            log.error('Student model validation failed!');
            let err = new Error('Student Validation Failed!');
            err.status = 400;
            // Remove stack trace but retain detailed description of validation errors
            err.data = JSON.parse(JSON.stringify(error));
            next(err);
            return;
        }

        log.info('Student model has been validated!');
        next();
    },
    /**
     * Creates a student
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     * @return {object}        Populates res.locals with newly created student document
     */
    create: (req, res, next) => {
        log.info('Module - Create Student');
        var student = new models.students(req.body);
        ctrls.mongodb.save(student, (err, result) => {
            if (err) {
                let err = new Error('Creation of student failed!');
                err.status = 500;
                next(err);
                return;
            }
            log.info('Successfully created student.');
            res.locals = result;
            next();
        });
    },
    /**
     * Gets all students
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     * @return {object}        Populates res.locals with array of all students documents
     */
    getAll: (req, res, next) => {
        log.info('Module - GetAll Students');
        ctrls.mongodb.find(models.students, {}, (err, results) => {
            if (err) {
                let err = new Error('Failed getting all students!');
                err.status = 500;
                next(err);
                return;
            }
            log.info('Successfully found all students.');
            res.locals = results;
            next();
        });
    },
    /**
     * Validates path id parameter
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     */
    validatePathId: (req, res, next) => {
        log.info('Module - validatePathId Student');

        log.info('Validating request...');
        if (!req.params.id) {
            log.error('Request validation failed');
            let err = new Error('Missing required id parameter in the request path. (/students/:id)');
            err.status = 400;
            next(err);
            return;
        }

        if (!ctrls.mongodb.isObjectId(req.params.id)) {
            log.error('Request validation failed');
            let err = new Error('Invalid id parameter in the request path.');
            err.status = 400;
            next(err);
            return;
        }

        log.info('Request validated!');
        next();
    },
    /**
     * Gets a student
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     * @return {object}        Populates res.locals with student document
     */
    getOne: (req, res, next) => {
        log.info('Module - GetOne Student');
        ctrls.mongodb.findById(models.students, req.params.id, (err, result) => {
            if (err) {
                let err = new Error('Oops something went wrong!');
                err.status = 500;
                next(err);
                return;
            }
            log.info('Successfully found student [' + req.params.id + ']');
            res.locals = result;
            next();
        });
    },
    /**
     * Deletes a student
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     * @return {object}        Populates res.locals with deletion result
     */
    deleteOne: (req, res, next) => {
        log.info('Module - DeleteOne Student');
        ctrls.mongodb.findByIdAndRemove(models.students, req.params.id, (err, result) => {
            if (err) {
                let err = new Error('Oops something went wrong!');
                err.status = 500;
                next(err);
                return;
            }
            log.info('Successfully deleted student [' + req.params.id + ']');
            res.locals = result;
            next();
        });
    }
};
