// models/users.js

const mongoose = require('mongoose');

async function main() {
    await mongoose.connect(
        "mongodb+srv://govindanipiyush:AyO5vhqyUBTisU0E@fairshare.4tlnw.mongodb.net/?retryWrites=true&w=majority&appName=fairshare"
    );
}

main()
  .then(() => {
    console.log("Users Database Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
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
    trips: [
        {
            _id: {
                type: String,
            },
            tripname: {
                type: String,
            },
            createdAt: {
                type: String,
            },
            // Optional: field to track how much is owed in this trip
            amountOwed: {
                type: Number,
                default: 0,
            },
            // New status field to track the trip status
            status: {
                type: String,
                enum: ['ongoing', 'completed'], // Possible status values
                default: 'ongoing',  // Default to 'ongoing'
            }
        }
    ]
});

const users = mongoose.model("Users", userSchema);
module.exports = users;
