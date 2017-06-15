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

var activityLog = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    log: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
}, {
    _id: false
});

var goal = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    completionDate: {
        type: Date
    },
    startDate: {
        type: Date
    },
    mark: {
        type: Number,
        default: 0
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classrooms'
    },
    activityLog: {
        type: [activityLog],
        default: []
    },
    goal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goals'
    }
}, {
    _id: false
});

var quiz = new mongoose.Schema({
    questionNumber: {
        type: Number,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {
    _id: false
});

var quizHistory = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    mark: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    results: {
        type: [quiz],
        default: []
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quizzes'
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
    }],
    quizHistory: {
        type: [quizHistory],
        default: []
    },
    goals: {
        type: [goal],
        default: []
    }
});

module.exports = mongoose.model('Students', schema);
