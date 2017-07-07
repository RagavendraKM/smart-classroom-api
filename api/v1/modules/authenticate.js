module.exports = {

    /**
     * Gets all teachers
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     * @return {object}        Populates res.locals with array of all teachers documents
     */
	student: (req, res, next) => {
    // find the student
    student.getOne({
    username: req.body.username
    }, function(error, student) {

		if (error) {
			log.error('Student authentification failed!');
			let err = new Error('Student authentification failed!');
			err.status = 400;
			// Remove stack trace but retain detailed description of validation errors
			err.data = JSON.parse(JSON.stringify(error));
			next(err);
			return;
		}

		if (!student) {
			res.json({ success: false, message: 'Authentication failed: Student not found.' });
		} else if (student) {

			// check if password matches
			if (student.password != req.body.password) {
			res.json({ success: false, message: 'Authentication failed: Wrong password.' });
			} else {

				// if student is found and password is right, create JSON token
				var token = jwt.sign(student, app.get('superSecret'), {
					expiresInMinutes: 1440 // expires in 24 hours
				});
				// return the information including token as JSON
				res.json({
					success: true,
					message: 'Token given.',
					token: token
				});
			}   

		}

    });
};