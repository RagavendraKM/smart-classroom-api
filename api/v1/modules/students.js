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
    },
    /**
     * Validates a goal for a student
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     */
    validateGoal: (req, res, next) => {
        log.info('Module - ValidateGoal Student');

        // Validate schema
        log.info('Validating student goal...');
        let fakeStudent = new models.students({
            goals: [req.body]
        });

        let student = new models.students(fakeStudent);
        let error = student.validateSync();

        if (error.errors['goals']) {
            log.error('Student goal validation failed!');
            let err = new Error('Student Goal Validation Failed!');
            err.status = 400;
            // Remove stack trace but retain detailed description of validation errors
            err.data = JSON.parse(JSON.stringify(error.errors['goals']));
            next(err);
            return;
        }

        log.info('Student goal has been validated!');
        next();
    },
    /**
     * Creates a goal for a student
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     * @return {object}        Populates res.locals with student model
     */
    createGoal: (req, res, next) => {
        log.info('Module - CreateGoal Student');
        ctrls.mongodb.findById(models.students, req.params.id, (err, result) => {
            if (err) {
                let err = new Error('Failed getting student!');
                err.status = 500;
                next(err);
                return;
            }
            log.info('Successfully found student [' + req.params.id + ']');

            log.info('Creating student goal');
            result.goals.push(req.body);

            ctrls.mongodb.save(result, (err, _result) => {
                if (err) {
                    let err = new Error('Failed creating student goal!');
                    err.status = 500;
                    next(err);
                    return;
                }

                log.info('Successfully created goal for student [' + req.params.id + ']');

                res.locals = _result;
                next();
            });
        });
    },
    /**
     * Validates an activity log entry for a student goal
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     */
    valdiateActivityLog: (req, res, next) => {
        log.info('Module - ValdiateActivityLog Student');

        log.info('Validating goal id...');
        if (!req.params.goalId) {
            log.error('Goal ID validation failed');
            let err = new Error('Missing required goal id parameter in the request path.');
            err.status = 400;
            next(err);
            return;
        }

        if (!ctrls.mongodb.isObjectId(req.params.goalId)) {
            log.error('Goal ID validation failed');
            let err = new Error('Invalid goal id parameter in the request path.');
            err.status = 400;
            next(err);
            return;
        }

        // Validate schema
        log.info('Validating student goal...');
        let fakeStudent = new models.students({
            goals: [{
                title: 'fake',
                activityLog: [req.body]
            }]
        });

        let student = new models.students(fakeStudent);
        let error = student.validateSync();

        // TODO: potentially change this as it may be confusing to consumer
        if (error.errors['goals'] && error.errors['goals']['errors']) {
            log.error('Student goal activity log validation failed!');
            let err = new Error('Student Goal Activity Log Validation Failed!');
            err.status = 400;
            // Remove stack trace but retain detailed description of validation errors
            err.data = JSON.parse(JSON.stringify(error.errors['goals']['errors']));
            next(err);
            return;
        }

        log.info('Student goal activity log has been validated!');
        next();
    },
    /**
     * Updates a student's goal's activity log
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     * @return {object}        Populates res.locals with student model
     */
    updateGoalActivityLog: (req, res, next) => {
        log.info('Module - UpdateGoalActivityLog Student');
        ctrls.mongodb.findById(models.students, req.params.id, (err, result) => {
            if (err) {
                let err = new Error('Failed getting student!');
                err.status = 500;
                next(err);
                return;
            }
            log.info('Successfully found student [' + req.params.id + ']');

            // TODO: Optimize the search?
            log.info('Searching for student goal [' + req.params.goalId + ']');
            for (let i = 0; i < result.goals.length; i++) {
                // Safe comparison of mongo DB ids
                if (String(result.goals[i]._id) === String(req.params.goalId)) {
                    // Re-calculate mark
                    let mark = req.body.mark * req.body.weight;
                    for (let j = 0; j < result.goals[i].activityLog.length; j++) {
                        mark += result.goals[i].activityLog[j].mark * result.goals[i].activityLog[j].weight;
                    }

                    // Update activity log
                    log.info('Updating student goal [' + req.params.goalId + '] with activity log entry');
                    result.goals[i].activityLog.push(req.body);

                    // Update goal mark
                    log.info('Updating goal progress');
                    result.goals[i].mark = mark;
                    break;
                }
            }

            ctrls.mongodb.save(result, (err, _result) => {
                if (err) {
                    let err = new Error('Failed updating student goal activity log!');
                    err.status = 500;
                    next(err);
                    return;
                }

                log.info('Successfully updated student goal activity log for student [' + req.params.id + ']');

                res.locals = _result;
                next();
            });
        });
    }
};
