const log = require('winston');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
var ctrls = require('../controllers');
var models = require('../models');
var config = require('../../../config');

module.exports =(req, res, next) => {
	
	// Check user type of login, whether it's student or teacher
	var userType;
	if (req.body.userType == 'teachers'){
		userType = models.teachers;
	}
	else if (req.body.userType == 'students'){
		userType = models.students;
	}
	else{
		log.error('Invalid User Type!');
        let err = new Error('Invalid User Type!');
        err.status = 400;
		next(err);
	}

    ctrls.mongodb.findOne(userType, {'username': req.body.username}, (error, result) => {

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
            res.locals = { success: false, message: 'Authentication failed: User not found.'};
        } else if (user) {
			// compare hashed password and input password
			var hashResult = bcrypt.compareSync(req.body.password, user.password)
			console.log(hashResult);
			console.log(user.password);
			console.log(req.body.password);
			// check if password matches
			if (hashResult == false) {
				res.locals = { success: false, message: 'Authentication failed: Wrong password.', 'username': req.body.username};
			} else {
				// if match, create JSON token
				var token = jwt.sign({'user':user.username}, config.tokenSecret, {
					expiresIn: '24h' // expires in 24 hours
				});
				// return response as JWT
				res.locals = {
					success: true,
					message: 'Token given.',
					token: token
				};
			}
        }
	next();
    });
};