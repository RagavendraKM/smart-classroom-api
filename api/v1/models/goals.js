const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'goal'
    },
    creationDate: {
        type: Date
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    weight: {
        type: Number,
        default: 0
    },
    mark: {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('Goals', schema);
