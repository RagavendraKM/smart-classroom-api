const log = require('winston');
var modules = require('../modules');

/**
 * Routes for /students endpoints
 * @param  {object} router ExpressJS Router
 */
module.exports = (router) => {
    log.info('Initializing Route POST /students');
    router.post('/students',
        modules.verify.body,
        modules.students.validateCreate,
        modules.students.create,
        modules.response);

    log.info('Initializing Route GET /students');
    router.get('/students',
        modules.students.getAll,
        modules.response);

    log.info('Initializing Route GET /students/:id');
    router.get('/students/:id',
        modules.verify.params,
        modules.students.validatePathId,
        modules.students.getOne,
        modules.response);

    log.info('Initializing Route DELETE /students/:id');
    router.delete('/students/:id',
        modules.verify.params,
        modules.students.validatePathId,
        modules.students.deleteOne,
        modules.response);

    log.info('Initializing Route PUT /students/:id/goals');
    router.put('/students/:id/goals',
        modules.verify.body,
        modules.verify.params,
        modules.students.validatePathId,
        //TODO: validate createGaol
        modules.students.createGoal,
        modules.response);


    // TODO: PUT /students/:id/goals/:id
};
