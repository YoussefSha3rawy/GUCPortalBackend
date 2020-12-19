const mongoose = require("mongoose");

const attendanceRecordSchema = new mongoose.Schema({
    staffId: {
        type: String,
        required: true
    },
    signInTime: {
        type: String
    },
    signOutTime: {
        type: String
    }
})

module.exports = mongoose.model("attendance_record", attendanceRecordSchema);