const log = require('winston');
var modules = require('../modules');

/**
 * Routes for /quizzes endpoints
 * @param  {object} router ExpressJS Router
 */
module.exports = (router) => {
    log.info('Initializing Route POST /quizzes');
    router.post('/quizzes',
        // TODO: Request validation
        modules.quizzes.create,
        modules.response);

    // TODO: GET /quizzes/:id
    // TODO: DELETE /quizzes/:id
};
