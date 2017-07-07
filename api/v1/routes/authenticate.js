const log = require('winston');
var modules = require('../modules');

/**
 * Routes for /teachers endpoints
 * @param  {object} router ExpressJS Router
 */
module.exports = (router) => {
	log.info('Initializing Route POST /authenticate');
    router.post('/authenticate/students',
        modules.authenticate.students
        modules.response);
		
    router.post('/authenticate/teachers',
        modules.authenticate.teachers
        modules.response);
};