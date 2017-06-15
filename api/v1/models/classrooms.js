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
    courseCode: {
        type: String
    },
    year: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        default: 'academic'
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Students'
    }],
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teachers',
        required: true
    },
    quizHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quizzes'
    }],
});
module.exports = mongoose.model('Classrooms', schema);
