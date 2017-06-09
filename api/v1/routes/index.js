/**
 * This is the entry point of all the routes in the API.
 * Each route should be composed of several modoules and included in this file.
 * @param  {object} router ExpressJS Enpoint Router
 */
module.exports = (router) => {
    require('./hello')(router);
    require('./error')(router);
};
