const mongoose = require("mongoose");

const TfgUserSchema = mongoose.Schema({
    titleTFG: String,
    assignedMailUser: String,
    active: Boolean,
    assigned: String,
    Points: Number,
    Experience: Number,
    AvgRating: Number,
    SelectedMethod: String,
    Priority: Number
});

module.exports = mongoose.model("TfgUser", TfgUserSchema);