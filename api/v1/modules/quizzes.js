const log = require('winston');
var ctrls = require('../controllers');
var models = require('../models');

module.exports = {
    /**
     * Creates a quiz
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     * @return {object}        Populates res.locals with newly created quiz document
     */
    create: (req, res, next) => {
        log.info('Module - Create quiz');
        var quiz = new models.quizzes(req.body);
        ctrls.mongodb.save(quiz, (err, result) => {
            if (err) {
                let err = new Error('Oops something went wrong!');
                err.status = 500;
                next(err);
                return;
            }
            log.info('Successfully created quiz');
            res.locals = result;
            next();
        });
    }
};