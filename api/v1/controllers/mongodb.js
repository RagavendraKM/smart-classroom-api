const log = require('winston');

module.exports = {
    /**
     * Finds one document in Mongo DB based on ID
     * @param  {object}   model    Mongoose Model
     * @param  {object}   criteria Search criteria
     * @param  {Function} callback JavaScript Callback
     */
    findById: (model, id, callback) => {
        try {
            log.info('[findByID] Searching Mongo DB for ' + id);
            model.findById(id).exec((err, result) => {
                if (err) {
                    // Catches Mongo DB errors
                    log.error('Mongo DB findByID failed!', err);
                    callback(err);
                    return;
                }
                log.info('[findByID] Finished searching Mongo DB.');
                log.debug(result);
                callback(null, result);
            });
        } catch (error) {
            // Catches execution errors
            log.error('Mongoose execution of [findByID] failed', error);
            callback(error);
        }
    },
    /**
     * Finds one document in Mongo DB
     * @param  {object}   model    Mongoose Model
     * @param  {object}   criteria Search criteria
     * @param  {Function} callback JavaScript Callback
     */
    findOne: (model, criteria, callback) => {
        try {
            log.info('[findOne] Searching Mongo DB');
            log.debug('Criteria:');
            log.debug(criteria);
            model.findOne(criteria).exec((err, result) => {
                if (err) {
                    // Catches Mongo DB errors
                    log.error('Mongo DB findOne failed!', err);
                    callback(err);
                    return;
                }
                log.info('[findOne] Finished searching Mongo DB');
                log.debug(result);
                callback(null, result);
            });
        } catch (error) {
            // Catches execution errors
            log.error('Mongoose execution of [findOne] failed', error);
            callback(error);
        }
    },
    /**
     * Finds documents in Mongo DB
     * @param  {object}   model    Mongoose Model
     * @param  {object}   criteria Search criteria
     * @param  {Function} callback JavaScript Callback
     */
    find: (model, criteria, callback) => {
        try {
            log.info('[find] Searching Mongo DB');
            log.debug('Criteria:');
            log.debug(criteria);
            model.find(criteria).exec((err, results) => {
                if (err) {
                    // Catches Mongo DB errors
                    log.error('Mongo DB find failed!', err);
                    callback(err);
                    return;
                }
                log.info('[find] Finished searching Mongo DB');
                log.debug(results);
                callback(null, results);
            });
        } catch (error) {
            // Catches execution errors
            log.error('Mongoose execution of [find] failed', error);
            callback(error);
        }
    },
    /**
     * Saves a document to Mongo DB
     * @param  {object}   model    Mongoose Model
     * @param  {Function} callback JavaScript Callback
     */
    save: (model, callback) => {
        try {
            log.info('Saving document into Mongo DB');
            model.save((err, data) => {
                if (err) {
                    // Catches Mongo DB errors
                    log.error('Mongo DB save failed!', err);
                    callback(err);
                    return;
                }
                callback(null, data);
            });
        } catch (error) {
            // Catches execution errors
            log.error('Mongoose execution of [save] failed!', error);
            callback(error);
        }
    }
};
