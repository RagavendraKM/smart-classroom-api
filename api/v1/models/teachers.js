const mongoose = require('mongoose');

var validate = {
    alphaNumeric: {
        validator: (v) => {
            return /^[a-zA-Z0-9-_ ]*$/.test(v);
        },
        message: 'Only alpha-numeric values are accepted!'
    }
};

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
        required: true,
        required: [true, 'displayName is a required field!'],
        validate: validate.alphaNumeric
    },
    password:{
        type: String
        required: true,
        required: [true, 'password is a required field!'],
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
