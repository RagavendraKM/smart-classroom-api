const log = require('winston');
var ctrls = require('../controllers');
var models = require('../models');

module.exports = {
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
                let err = new Error('Oops something went wrong!');
                err.status = 500;
                next(err);
                return;
            }
            log.info('Successfully created student');
            res.locals = result;
            next();
        });
    }
};
