const log = require('winston');
var ctrls = require('../controllers');
var models = require('../models');
var config = require('../../../config');

module.exports =(req, res, next) => {

    ctrls.mongodb.findOne(models.students, {'username': req.body.username}, (error, result) => {

        if (error) {
            log.error('User authentification failed!');
            let err = new Error('User authentification failed!');
            err.status = 400;
            // Remove stack trace but retain detailed description of validation errors
            err.data = JSON.parse(JSON.stringify(error));
            next(err);
            return;
        }
		
        var user=result;
		
        if (!user) {    // If user not found...
            res.locals = ({ success: false, message: 'Authentication failed: User not found.' });
        } else if (user) {
            // check if password matches
            if (user.password != req.body.password) {
                res.locals = ({ success: false, message: 'Authentication failed: Wrong password.', 'user':user, 'username': req.body.username});
            } else {
                // if match, create JSON token
                var token = jwt.sign(user, config.tokenSecret, {
                    expiresInMinutes: 1440 // expires in 24 hours
                });
                // return response as JWT
                res.locals = ({
                    success: true,
                    message: 'Token given.',
                    token: token
                });
            }
        }
		next();
    });
};