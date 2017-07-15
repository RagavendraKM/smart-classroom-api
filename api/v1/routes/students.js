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
		modules.authenticate.checkToken,
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

    log.info('Initializing Route POST /students/:id/goals');
    router.post('/students/:id/goals',
        modules.verify.body,
        modules.verify.params,
        modules.students.validatePathId,
        modules.students.validateGoal,
        modules.students.createGoal,
        modules.response);

    log.info('Initializing Route POST /students/:goalId/goals/:id');
    router.post('/students/:id/goals/:goalId/activityLogs',
        modules.verify.body,
        modules.verify.params,
        modules.students.validatePathId,
        modules.students.valdiateActivityLog,
        modules.students.updateGoalActivityLog,
        modules.response);

    // TODO: DELETE /students/:id/goals/:goalId
    // TODO: POST /students/:id/quizzes
    // TODO: POST /students/:id/quizzes/:quizId/results
    // TODO: POST /students/:id/classrooms/:classroomId
    // TODO: DELETE /students/:id/classrooms/:classroomId
};
