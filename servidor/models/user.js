const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    creditos: Number,
    notamedia: Number,
    experiencia: Number,
    role: String,
    active: Boolean,
    avatar: String,

});

module.exports = mongoose.model("User", UserSchema);