const log = require('winston');
var modules = require('../modules');

/**
 * Routes for /goals endpoints
 * @param  {object} router ExpressJS Router
 */
module.exports = (router) => {
    log.info('Initializing Route POST /goals');
    router.post('/goals',
        // TODO: Request validation
        modules.goals.create,
        modules.response);

    // TODO: GET /goals/:id
    // TODO: DELETE /goals/:id
};
