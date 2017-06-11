const log = require('winston');

module.exports = {
    /**
     * Finds documents in Mongo DB
     * @param  {object}   model    Mongoose Model
     * @param  {object}   criteria Search criteria
     * @param  {Function} callback JavaScript Callback
     */
    find: (model, criteria, callback) => {
        try {
            model.find(criteria).exec((err, results) => {
                if (err) {
                    // Catches Mongo DB errors
                    log.error('Mongo DB find failed!', err);
                    callback(err);
                    return;
                }
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
