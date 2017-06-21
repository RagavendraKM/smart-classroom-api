const mongoose = require('mongoose');

var facebook = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'id is a required parameter!']
    },
    profilePicture: {
        type: String,
        required: [true, 'profilePicture is a required parameter!']
    }
}, {
    _id: false
});

var activityLog = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'date is a required parameter!']
    },
    log: {
        type: String,
        required: [true, 'log is a required parameter!']
    },
    weight: {
        type: Number,
        required: [true, 'weight is a required parameter!']
    },
    mark: {
        type: Number,
        required: [true, 'mark is a required parameter!']
    }
}, {
    _id: false
});

var goal = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is a required parameter!']
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
});

var quiz = new mongoose.Schema({
    questionNumber: {
        type: Number,
        required: [true, 'questionNumber is a required parameter!']
    },
    answer: {
        type: String,
        required: [true, 'answer is a required parameter!']
    }
}, {
    _id: false
});

var quizHistory = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is a required parameter!']
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
        required: [true, 'facebook is a required parameter!']
    },
    firstName: {
        type: String,
        required: true,
        required: [true, 'firstName is a required parameter!']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is a required parameter!']
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
