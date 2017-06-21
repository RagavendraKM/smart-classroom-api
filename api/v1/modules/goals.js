const log = require('winston');
var ctrls = require('../controllers');
var models = require('../models');

module.exports = {
    /**
     * Validates schema before creating a goal
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     */
    validateCreate: (req, res, next) => {
        log.info('Module - ValidateCreate Goal');

        // Validate schema
        log.info('Validating goal model...')
        var goal = new models.goals(req.body);
        var error = goal.validateSync();

        if (error) {
            log.error('Goal model validation failed!');
            let err = new Error('Goal Validation Failed!');
            err.status = 400;
            // Remove stack trace but retain detailed description of validation errors
            err.data = JSON.parse(JSON.stringify(error));
            next(err);
            return;
        }

        log.info('Goal model has been validated!');
        next();
    },
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
