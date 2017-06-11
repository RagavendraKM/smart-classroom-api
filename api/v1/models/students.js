const mongoose = require('mongoose');

var facebook = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
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
    progressAcquired: {
        type: Number,
        required: true
    }
}, {
    _id: false
});

var goal = new mongoose.Schema({
    completed: {
        type: Boolean,
        default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    dateCompleted: {
        type: Date
    },
    dateStarted: {
        type: Date
    },
    progress: {
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

var schema = new mongoose.Schema({
    facebook: {
        type: facebook,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    displayName: {
        type: String
    },
    birthday: {
        type: Date
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classrooms'
    }],
    goals: {
        type: [goal],
        default: []
    },
    absences: {
        type: [Date],
        default: []
    }
});

module.exports = mongoose.model('Students', schema);
