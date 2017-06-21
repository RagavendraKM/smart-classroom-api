const log = require('winston');
var modules = require('../modules');

/**
 * Routes for /teachers endpoints
 * @param  {object} router ExpressJS Router
 */
module.exports = (router) => {
    log.info('Initializing Route POST /teachers');
    router.post('/teachers',
        modules.verify.body,
        modules.teachers.validateCreate,
        modules.teachers.create,
        modules.response);

    log.info('Initializing Route GET /teachers');
    router.get('/teachers',
        modules.teachers.getAll,
        modules.response);

    log.info('Initializing Route GET /teachers/:id');
    router.get('/teachers/:id',
        modules.verify.params,
        modules.teachers.validatePathId,
        modules.teachers.getOne,
        modules.response);

    log.info('Initializing Route DELETE /teachers/:id');
    router.delete('/teachers/:id',
        modules.verify.params,
        modules.teachers.validatePathId,
        modules.teachers.deleteOne,
        modules.response);

    // TODO: POST /teachers/:id/classrooms/:classroomId
    // TODO: DELETE /teachers/:id/classrooms/:classroomId
};
