const mongoose = require('mongoose');

var validate = {
    alphaNumeric: {
        validator: (v) => {
            return /^[a-zA-Z0-9-_ ]*$/.test(v);
        },
        message: 'Only alpha-numeric values are accepted!'
    }
};

var facebook = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'id is a required field!'],
        unique: [true, 'id must be unique']
    },
    profilePicture: {
        type: String,
        required: [true, 'profilePicture is a required field!']
    }
}, {
    _id: false
});

var schema = new mongoose.Schema({
    facebook: {
        type: facebook,
        required: [true, 'facebook is a required field!']
    },
    firstName: {
        type: String,
        required: [true, 'firstName is a required field!'],
        validate: validate.alphaNumeric
    },
    lastName: {
        type: String,
        required: [true, 'lastName is a required field!'],
        validate: validate.alphaNumeric
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
