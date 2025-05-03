 const mongoose = require('mongoose');

// Database connection
async function main() {
    await mongoose.connect(
        "mongodb+srv://govindanipiyush:AyO5vhqyUBTisU0E@fairshare.4tlnw.mongodb.net/?retryWrites=true&w=majority&appName=fairshare"
    );
}
main()
    .then(() => {
        console.log("Trips Database Connection Successful");
    })
    .catch((err) => {
        console.error("Database Connection Error:", err);
    });

// Define the trip schema
const tripSchema = new mongoose.Schema({
    tripname: {
        type: String,
        required: true,
    },
    members: [
        {
            _id: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            fullname: {
                type: String,
                required: true,
            },
            email: { // New field for user email
                type: String,
                required: true,
            },
            totalSpend: {
                type: Number,
                default: 0,
            },
            balance: { // Track how much this member owes or is owed
                type: Number,
                default: 0,
            },
            owed: [ // Payments owed to other members
                {
                    toMemberId: { type: String, required: true }, // ID of the member to whom money is owed
                    amount: { type: Number, required: true }, // Amount owed
                    toMemberFullname: { type: String, required: true }, // Full name of the member owed
                    toMemberUsername: { type: String, required: true }, // Username of the member owed
                }
            ]
        }
    ],
    totalTripCost: { // Total cost of the trip
        type: Number,
        default: 0,
    },
    perMemberShare: { // Fair share per member
        type: Number,
        default: 0,
    },
    paymentHistory: [
        {
            _id: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            fullname: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            spend: {
                type: Number,
                required: true,
            },
            where: {
                type: String,
                required: true,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Field to store payment suggestions
    suggestedPayments: [
        {
            fromMemberId: { type: String, required: true },
            fromMemberFullname: { type: String, required: true },
            fromMemberUsername: { type: String, required: true },
            toMemberId: { type: String, required: true },
            toMemberFullname: { type: String, required: true },
            toMemberUsername: { type: String, required: true },
            amount: { type: Number, required: true },
            upiId: { type: String},
        }
    ],
    // New status field, default is "ongoing"
    status: {
        type: String,
        // enum: ['ongoing', 'completed'],
        default: 'ongoing',
    },
    admin: {type: String},
});

// Create the trips model
const Trips = mongoose.model("Trips", tripSchema);
module.exports = Trips;
