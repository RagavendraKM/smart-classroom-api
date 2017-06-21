const log = require('winston');
var modules = require('../modules');

/**
 * Routes for /goals endpoints
 * @param  {object} router ExpressJS Router
 */
module.exports = (router) => {
    log.info('Initializing Route POST /goals');
    router.post('/goals',
        modules.verify.body,
        modules.goals.validateCreate,
        modules.goals.create,
        modules.response);

    // TODO: GET /goals/:id
    // TODO: DELETE /goals/:id
};
