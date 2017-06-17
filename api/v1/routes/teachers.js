const log = require('winston');
var modules = require('../modules');

/**
 * Routes for /teachers endpoints
 * @param  {object} router ExpressJS Router
 */
module.exports = (router) => {
    log.info('Initializing Route POST /teachers');
    router.post('/teachers',
        // TODO: Request validation
        modules.teachers.create,
        modules.response);

    // TODO: GET /teachers/:id
    // TODO: DELETE /teachers/:id
    // TODO: PUT /teachers/:id/classrooms
};
