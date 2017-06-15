const mongoose = require('mongoose');

var facebook = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    }
}, {
    _id: false
});

var schema = new mongoose.Schema({
    facebook: {
        type: facebook,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    displayName: {
        type: String
    },
    birthday: {
        type: Date
    },
    classrooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classrooms'
    }]
});

module.exports = mongoose.model('Teachers', schema);
