const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
    },
    password: {
        type: String,
    },
    upiId : {type : String},
});

const users = mongoose.model("Users", userSchema);
module.exports = users;
