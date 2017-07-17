const mongoose = require('mongoose');

var presence = new mongoose.Schema({
    student: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Students',
		present:{
            type: Boolean,
            default: false
		}
    }

}, {
    _id: false
});

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date
    },
    activated: {
        type: Boolean,
        default: false
    },
    presences: {
        type: [presence],
        default: []
    }
});

module.exports = mongoose.model('Attendances', schema);
