const log = require('winston');
var modules = require('../modules');

/**
 * Routes for /attendances endpoints
 * @param  {object} router ExpressJS Router
 */
module.exports = (router) => {
    log.info('Initializing Route GET /attendances');
    router.get('/attendances',
        modules.attendances.getAll,
        modules.response);

    log.info('Initializing Route GET /attendances/:id');
    router.get('/attendances/:id',
        modules.verify.params,
        modules.attendances.validatePathId,
        modules.attendances.getOne,
        modules.response);

    log.info('Initializing Route DELETE /attendances/:id');
    router.delete('/attendances/:id',
        modules.verify.params,
        modules.attendances.validatePathId,
        modules.attendances.deleteOne,
        modules.response);

    log.info('Initializing Route DELETE /attendances/:id/start');
    router.post('/attendances/:id/start',
        modules.verify.params,
        modules.attendances.validatePathId,
        modules.attendances.startAttendance,
        modules.response);

    log.info('Initializing Route DELETE /attendances/:id/stop');
    router.post('/attendances/:id/stop',
        modules.verify.params,
        modules.attendances.validatePathId,
        modules.attendances.stopAttendance,
        modules.response);
};
