const mongoose = require("mongoose");
const {MongooseAutoIncrementID} = require('mongoose-auto-increment-reworked');

const academicMemberSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
        // TODO: check format
    },
    password: {
        type: String,
        required: true
        // TODO: password requirments
    },
    gender: {
        type: String,
        required: true,
        enum : ["Male", "Female"]
    },
    role: {
        type: String,
        required: true,
        enum : ["Instructor", "Head of Department", "TA", "Course Coordinator"]
    },
    faculty: {
        type: String
        // TODO: find faculties from faculty schema
        // enum:
    },
    department: {
        type: String
        // TODO: find department from department schema
        // enum:
    },
    office: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    dayOff: {
        type: String,
        enum : ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
    },
    leaveBalance: {
        type: Number,
        default: 0
    },
    accidentalLeaveBalance: {
        type: Number,
        default: 6
    },
    remainingHours: {
        type: Number
    }
});

academicMemberSchema.plugin(MongooseAutoIncrementID.plugin, {
    modelName: "academic_member",
    field: "idCount",
    incrementBy: 1,
    nextCount: "nextCount",
    resetCount: "resetCount",
    startAt: 1,
    unique: true
  });

module.exports = mongoose.model("academic_member", academicMemberSchema);