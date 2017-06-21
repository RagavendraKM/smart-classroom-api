const log = require('winston');
var modules = require('../modules');

/**
 * Routes for /students endpoints
 * @param  {object} router ExpressJS Router
 */
module.exports = (router) => {
    log.info('Initializing Route POST /students');
    router.post('/students',
        // TODO: Request validation
        modules.students.create,
        modules.response);

    router.get('/students',
        modules.students.getAll,
        modules.response);

    router.get('/students/:id',
        modules.students.getOne,
        modules.response);

    // TODO: GET /students/:id
    // TODO: DELETE /students/:id
    // TODO: PUT /students/:id/goals
};
