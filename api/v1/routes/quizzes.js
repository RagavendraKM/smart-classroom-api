const log = require('winston');
var modules = require('../modules');

/**
 * Routes for /quizzes endpoints
 * @param  {object} router ExpressJS Router
 */
module.exports = (router) => {
    log.info('Initializing Route POST /quizzes');
    router.post('/quizzes',
        modules.verify.params,
        modules.quizzes.create,
        modules.quizzes.create,
        modules.response);

    log.info('Initializing Route GET /quizzes');
    router.get('/quizzes',
        modules.quizzes.getAll,
        modules.response);

    log.info('Initializing Route GET /quizzes/:id');
    router.get('/quizzes/:id',
        modules.verify.params,
        modules.quizzes.validatePathId,
        modules.quizzes.getOne,
        modules.response);

    log.info('Initializing Route DELETE /quizzes/:id');
    router.delete('/quizzes/:id',
        modules.verify.params,
        modules.quizzes.validatePathId,
        modules.quizzes.deleteOne,
        modules.response);
};
