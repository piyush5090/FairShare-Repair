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
    },
    password: {
        type: String,
    },
    notifications: [
        {
            fromId: { type: Schema.Types.ObjectId, ref: 'Users' },
            fromUsername: {type: String},
            fromFullname : {type: String},
            message:{type: String},
            tripId : { type: Schema.Types.ObjectId, ref: 'Trips' },
            tripName: {type:String},
            time: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    upiId : {type : String},
});

const users = mongoose.model("Users", userSchema);
module.exports = users;
