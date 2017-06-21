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
        ctrls.mongodb.save(classroom, (err, classroomData) => {
            if (err) {
                let err = new Error('Failed creating classroom!');
                err.status = 500;
                next(err);
                return;
            }
            ctrls.mongodb.findById(models.teachers, classroomData.teacher, (err, teacherData) => {
                //TODO: figure out how to properly handle error
                if (err) {
                    log.error('Failled adding classroom to teacher [' + classroomData.teacher + ']');
                    return;
                }
                log.info('Successfully found teacher [' + classroomData.teacher + ']');

                log.info('Adding classroom to teacher');
                teacherData.classrooms.push(classroomData._id);

                ctrls.mongodb.save(teacherData, (err, _result) => {
                    //TODO: figure out how to properly handle error
                    if (err) {
                        log.error('Failled adding classroom to teacher [' + classroomData.teacher + ']');
                        return;
                    }
                    log.info('Successfully added teacher to classroom');
                });
            });

            for (let i = 0; i < classroomData.students.length; i++) {
                ctrls.mongodb.findById(models.students, classroomData.students[i], (err, studentData) => {
                    //TODO: figure out how to properly handle error
                    if (err) {
                        log.error('Failled adding classroom to student [' + classroomData.students[i] + ']');
                        return;
                    }
                    log.info('Successfully found student [' + classroomData.students[i] + ']');

                    log.info('Adding classroom to student');
                    studentData.classrooms.push(classroomData._id);

                    ctrls.mongodb.save(studentData, (err, _result) => {
                        //TODO: figure out how to properly handle error
                        if (err) {
                            log.error('Failled adding classroom to student [' + classroomData.students[i] + ']');
                            return;
                        }

                        log.info('Successfully added student [' + classroomData.students[i] + '] to classroom');
                    });
                });
            }

            log.info('Successfully created classroom');
            res.locals = classroomData;
            next();
        });
    },
    /**
     * Gets all classrooms
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     * @return {object}        Populates res.locals with array of all classrooms documents
     */
    getAll: (req, res, next) => {
        log.info('Module - GetAll Classrooms');
        ctrls.mongodb.find(models.classrooms, {}, (err, results) => {
            if (err) {
                let err = new Error('Failed getting all classrooms!');
                err.status = 500;
                next(err);
                return;
            }
            log.info('Successfully found all classrooms.');
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
        log.info('Module - validatePathId Classrooms');

        log.info('Validating request...');
        if (!req.params.id) {
            log.error('Request validation failed');
            let err = new Error('Missing required id parameter in the request path. (/classrooms/:id)');
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
     * Gets a classroom
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     * @return {object}        Populates res.locals with classroom document
     */
    getOne: (req, res, next) => {
        log.info('Module - GetOne Classroom');
        ctrls.mongodb.findById(models.classrooms, req.params.id, (err, result) => {
            if (err) {
                let err = new Error('Failed getting classroom: ' + req.params.id);
                err.status = 500;
                next(err);
                return;
            }
            log.info('Successfully found classroom [' + req.params.id + ']');
            res.locals = result;
            next();
        });
    },
    /**
     * Deletes a classroom
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     * @return {object}        Populates res.locals with deletion result
     */
    deleteOne: (req, res, next) => {
        log.info('Module - DeleteOne Classrooms');
        ctrls.mongodb.findByIdAndRemove(models.classrooms, req.params.id, (err, result) => {
            if (err) {
                let err = new Error('Failed deleting classroom: ' + req.params.id);
                err.status = 500;
                next(err);
                return;
            }
            log.info('Successfully deleted classroom [' + req.params.id + ']');
            res.locals = result;
            next();
        });
    },
};
