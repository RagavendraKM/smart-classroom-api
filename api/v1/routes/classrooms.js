const log = require('winston');
var modules = require('../modules');

/**
 * Routes for /classrooms endpoints
 * @param  {object} router ExpressJS Router
 */
module.exports = (router) => {
    log.info('Initializing Route POST /classrooms');
    router.post('/classrooms',
        modules.verify.body,
        modules.classrooms.validateCreate,
        modules.classrooms.create,
        modules.response);

    log.info('Initializing Route GET /classrooms');
    router.get('/classrooms',
        modules.classrooms.getAll,
        modules.response);

    log.info('Initializing Route GET /classrooms/:id');
    router.get('/classrooms/:id',
        modules.verify.params,
        modules.classrooms.validatePathId,
        modules.classrooms.getOne,
        modules.response);

    log.info('Initializing Route DELETE /classrooms/:id');
    router.delete('/classrooms/:id',
        //  modules.verify.token,
        modules.verify.params,
        modules.classrooms.validatePathId,
        //  modules.classrooms.verifyTeacher,
        modules.classrooms.deleteOne,
        modules.response);

    log.info('Initializing Route POST /classrooms/:id/quizzes');
    router.post('/classrooms/:id/quizzes',
        modules.verify.body,
        modules.verify.params,
        modules.classrooms.validatePathId,
        modules.classrooms.validateQuizCreation,
        modules.classrooms.createQuiz,
        modules.response);

    log.info('Initializing Route GET /classrooms/:id/quizzes');
    router.get('/classrooms/:id/quizzes',
        modules.verify.params,
        modules.classrooms.validatePathId,
        modules.classrooms.getAllQuizzes,
        modules.response);

    log.info('Initializing Route GET /classrooms/:id/quizzes/activated');
    router.get('/classrooms/:id/quizzes/activated',
        modules.verify.params,
        modules.classrooms.validatePathId,
        modules.classrooms.getAllActiveQuizzes,
        modules.response);

    log.info('Initializing Route GET /classrooms/:id/students');
    router.get('/classrooms/:id/students',
        modules.verify.params,
        modules.classrooms.validatePathId,
        modules.classrooms.getAllStudents,
        modules.response);
};
