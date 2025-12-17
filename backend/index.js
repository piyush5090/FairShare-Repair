require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const methodOverride = require("method-override");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Database Connection
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

main()
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });


const users = require("./models/users.js")
const trips = require("./models/trips.js")
const Expense = require("./models/expense.js");
const Notification = require("./models/notification.js");
const user = require('./routes/users.js')
const cors = require('cors');
//const userRoutes = require('./routes/users.js');


app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cors());    
const allowedOrigins = [
    'http://localhost:5173',
    'https://fair-share-2.vercel.app'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));
  
const bcrypt = require('bcryptjs');
const { authenticateToken } = require('./utilities.js');
//const { default: axiosInstance } = require('../frontend/utils/axiosInstance.js');

// app.use(cors({
//     origin: 'https://your-frontend-domain.com', // Replace with your frontend's domain
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log("Server is Listening on Port 8080");
});

app.post('/signup', async (req, res) => {
    try {
        let { Fullname, Username, Email, Password } = req.body.users;

        let check = await users.findOne({ email: Email});
        let checkUsername = await users.findOne({username: Username});
        if (check) {
            console.log("Email already in use");
            return res.status(400).send({ message: "Email already in use" });
        }else if(checkUsername){
            console.log("Username already exist");
            return res.status(400).send({message: "Username already exist"});
        }

        const hashedPassword = await bcrypt.hash(Password, 10); // 10 is the salt

        let newUser = new users({
            fullname: Fullname,
            username: Username,
            email: Email,
            password: hashedPassword,
        });

        // Save the new user
        await newUser.save()
        .then(()=>{
            console.log("User added successfully");

            // Create JWT token
            const accessToken = jwt.sign(
                { user: newUser }, // Pass the newUser instead of user
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "3600m",
                }
            );
    
            // Send successful response
            return res.json({
                error: false,
                newUser,
                accessToken,
                message: "Registration Successful",
            });
        
        }).catch((err)=>{
            console.log(err);
            res.json({message:"Username already exist"});
        })
        
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Server error" });
    }
});

app.post("/login",async (req,res)=>{
    try{
        let {Email,Password} = req.body.users;
        let check = await users.findOne({email:Email});
        if(check){
            let hashedPassword = check.password;
            const passwordMatch = await bcrypt.compare(Password, hashedPassword);
            if(passwordMatch){
                const user = { user : check };
                const accessToken = jwt.sign(
                    user,
                    process.env.ACCESS_TOKEN_SECRET,{
                    expiresIn: "3600m",
                });
                console.log("Redirecting you to Dashboard");
                return res.status(200).json({
                    error:false,
                    Email,
                    accessToken,
                    message:"Redirecting you to Dashboard",
                });
            }else{
                res.status(400).json({
                    error:true,
                    message:"Wrong Password",
                });
                console.log("Wrong Password");
            }
        }else{
            res.status(400).json({
                error:true,
                message:"User does not exist",
            });
            console.log("User does not exist");
        }
    }catch(err){
        console.log(err);
    }
});

app.get("/getUser", authenticateToken, async (req, res) => {
    const { user }   = req.user;
    //console.log(req);
    const isUser = await users.findOne({ _id: user._id });
    if (!isUser) return res.sendStatus(400);
    console.log(user);
    console.log("_______________" + isUser);
    return res.json({
      user: {
        username: isUser.username,
        email: isUser.email,
        _id: isUser._id,
        fullname: isUser.fullname,
        upiId : isUser.upiId,
      },
      message: "",
    });
  });

  app.get("/getUser/:id", authenticateToken, async (req,res)=>{
    const userId = req.params.id;
    const isUser = await users.findById({ _id: userId});
    if(!isUser) return res.sendStatus(400);
    console.log(isUser);
    return res.json({
        upiId: isUser.upiId,
    })
  })


  app.post("/newTrip", authenticateToken, async (req, res) => {
    try {
      const { tripName } = req.body.change;
      const { user } = req.user;
      
      const iUser = await users.findById(user._id);
  
      if (!iUser) {
        return res.status(404).json({ error: true, message: "User not found" });
      }
  
      let newTrip = new trips({
        tripname: tripName,
        createdAt: new Date().getTime(),
        admin: iUser._id,
        status: 'ongoing',
        members: [{ _id: iUser._id, totalSpend: 0 }] 
      });
  
      await newTrip.save();
  
      return res.json({
        error: false,
        newTrip,
        message: "Trip added and saved to user's trips successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, message: "Server error" });
    }
  });
  

//   app.get("/getTrip/:id", async (req,res)=>{
//     console.log(req);
//   })


app.get('/getAllTrips',authenticateToken, async (req,res)=>{
    try{
        const { user } = req.user;
        const userTrips = await trips.find({ 'members._id': user._id });
        return res.json(userTrips);
    }catch(err){
        console.log(err);
        return res.status(500).json({error:true,message:"Server Error"});
    }
});

app.get("/getTrip/:id",authenticateToken, async (req,res)=>{
    try{
        const _id  = req.params.id;
        //console.log(_id);
        const indiTrip = await trips.findById({_id}).populate('members._id', 'username fullname email');
        res.json(indiTrip);
    }catch(err){
        console.log(err);
        res.status(500).json({error:true,message:"Server error"});
    }
});

app.get("/getAllUsers", authenticateToken, async (req,res)=>{
    try{
        const allUsers = await users.find({});
        res.json({allUsers});
    }catch(err){
        console.log(err);
        res.status(500).json({error:true, message: "Internal Server error"});
    }
});

app.put("//:id", authenticateToken, async (req,res)=>{
    const currUser = req.body.currUser;
    const _id = currUser._id;
    //console.log(_id);
    const tripData = req.body.tripData;
    const  user = await users.findById({_id});
    //console.log(user);

    const fiTrip = await trips.findById({_id: tripData.TripId});
    //const members = fiTrip.members;
    //console.log(members);

    const member ={
        _id : user._id,
        totalSpend: 0,
    }
    
    fiTrip.members.push(member);
    await fiTrip.save().then(()=>{
        console.log("Member added success");
    })
    //console.log("To save",tripToSave);
    const id = tripData.TripId;
    //console.log("kalua",id);
    const trip = await trips.findById({_id: id});
    //console.log(trip);
    //console.log("Here and now",currUser, "Trip Data", tripData);
});


app.put("/add/:id", authenticateToken, async (req, res) => {
    try {
        const currUser = req.body.currUser;
        const _id = currUser._id;
        const tripData = req.body.tripData;
        const info = req.body.info; // This is the notification object from the frontend

        // Find the user by ID
        const user = await users.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the trip by ID
        const fiTrip = await trips.findById(tripData.TripId);
        if (!fiTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        // Check if the member exists in the trip's members array
        const existingMember = fiTrip.members.find(
            (member) => member._id.toString() === user._id.toString()
        );

        // If a notification ID is present, delete it
        if (info && info._id) {
            await Notification.findByIdAndDelete(info._id);
            console.log(`Notification ${info._id} deleted.`);
        }
        
        // If the member does not exist, add them to the trip
        if (!existingMember) {
            const newMember = {
                _id: user._id,
                totalSpend: 0, 
            };
            fiTrip.members.push(newMember);
            await fiTrip.save();
            console.log("Member added to trip successfully.");
        } else {
            console.log("Member already exists in the trip.");
        }

        res.status(200).json({
            message: "Member added successfully",
            trip: fiTrip
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err });
    }
});

app.put("/reject/:id", authenticateToken, async(req,res)=>{
    const info = req.body.info;
    try{
        if (info && info._id) {
            await Notification.findByIdAndDelete(info._id);
            console.log(`Notification ${info._id} deleted.`);
            res.status(200).json({message: "Notification rejected and removed"});
        } else {
            res.status(400).json({message: "No notification ID provided"});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error", error: err });
    }
})


app.post('/:tripId/addSpend', authenticateToken, async (req, res) => {
    const { tripId } = req.params;
    const { amount, where } = req.body;

    // Input validation
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
    }

    if (!where || typeof where !== 'string') {
        return res.status(400).json({ message: 'Invalid "where" field' });
    }

    try {
        // Find the trip
        const trip = await trips.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Extract user information from token
        const { user } = req.user;

        // Find the logged-in user in the members array
        const memberIndex = trip.members.findIndex(m => m._id.toString() === user._id.toString());
        if (memberIndex === -1) {
            return res.status(404).json({ message: 'User not found in trip members' });
        }

        // Update totalSpend in trip document
        trip.members[memberIndex].totalSpend += amount;
        await trip.save();

        // Create new Expense document
        const newExpense = new Expense({
            description: where,
            amount: amount,
            trip: tripId,
            paidBy: user._id,
        });

        await newExpense.save();

        res.status(200).json({ message: 'Spend added successfully', trip });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


app.get('/:tripId/expenses', authenticateToken, async (req, res) => {
    const { tripId } = req.params;

    try {
        const expenses = await Expense.find({ trip: tripId }).populate('paidBy', 'username fullname');
        if (!expenses) {
            return res.status(404).json({ message: 'No expenses found for this trip.' });
        }

        return res.status(200).json(expenses);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while fetching expenses.' });
    }
});


//Email logic
const transporter = nodemailer.createTransport({
    service: 'gmail', // Change to your email service provider if different
    auth: {
        user: process.env.EMAIL_USER,   // Replace with your email address
        pass: process.env.EMAIL_PASS    // Replace with your email password or app-specific password if using Gmail
    }
});

//Main logic


app.post('/api/trip/end/:tripId',authenticateToken, async (req, res) => {
    const tripId = req.params.tripId;

    try {
        // Fetch the trip and populate member details
        const trip = await trips.findById(tripId).populate('members._id', 'fullname username email upiId');
        
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        // Step 1: Calculate total trip cost and per-member share
        const totalTripCost = trip.members.reduce((total, member) => total + member.totalSpend, 0);
        const perMemberShare = totalTripCost / trip.members.length;

        trip.totalTripCost = totalTripCost;
        trip.perMemberShare = perMemberShare;

        // Step 2: Calculate balances for each member
        const balances = trip.members.map(member => ({
            member: member._id, // this is now the populated user object
            balance: member.totalSpend - perMemberShare,
        }));

        let owers = balances.filter(b => b.balance < 0);
        let receivers = balances.filter(b => b.balance > 0);

        // Step 3: Match owers and receivers
        const transactions = [];
        let i = 0, j = 0;

        while (i < owers.length && j < receivers.length) {
            const oweAmount = Math.abs(owers[i].balance);
            const receiveAmount = receivers[j].balance;

            const transactionAmount = Math.min(oweAmount, receiveAmount);
            transactions.push({
                from: owers[i].member._id,
                to: receivers[j].member._id,
                amount: transactionAmount,
            });

            // Adjust balances
            receivers[j].balance -= transactionAmount;
            owers[i].balance += transactionAmount;

            if (owers[i].balance === 0) i++;
            if (receivers[j].balance === 0) j++;
        }

        trip.suggestedPayments = transactions;
        trip.status = 'completed';

        await trip.save();

        // Step 7: Send an email to each member
        const emailPromises = trip.members.map(member => {
            const mailOptions = {
                from: 'farisharebusiness@gmail.com',
                to: member._id.email, // Access email from populated member
                subject: `Your Trip "${trip.tripname}" Has Ended`,
                text: `
                    Hi ${member._id.fullname},
    
                    The trip "${trip.tripname}" has ended. Here are the summary details:
    
                    - Total Trip Cost: ₹${totalTripCost.toFixed(2)}
                    - Per Member Cost: ₹${perMemberShare.toFixed(2)}
    
                    You can check the details of any suggested payments in your account.
    
                    Thank you for using FairShare!
    
                    Regards,
                    FairShare Team
                `,
            };

            return transporter.sendMail(mailOptions);
        });

        await Promise.all(emailPromises);

        res.status(200).json({ message: "Trip ended successfully" });

    } catch (error) {
        console.error("Error ending trip or sending emails:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Assuming you already have your Trips model imported
app.get("/tripSuggestions/:tripId",authenticateToken, async (req, res) => {
    const { tripId } = req.params;

    try {
        // Find the trip by its ID and populate the names
        const trip = await trips.findById(tripId)
            .populate('suggestedPayments.from', 'fullname username upiId')
            .populate('suggestedPayments.to', 'fullname username upiId');

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.status(200).json({ suggestions: trip.suggestedPayments });
    } catch (error) {
        console.error("Error fetching trip suggestions:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// Notifications
app.get('/notifications', authenticateToken, async (req, res) => {
    try {
        const { user } = req.user;
        const notifications = await Notification.find({ recipient: user._id })
            .populate('sender', 'fullname username')
            .populate('trip', 'tripname')
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        console.error("Error fetching notifications:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/invitations/:userId",authenticateToken, async (req,res)=>{
    const { userId: recipientId } = req.params;
    const { notification: notificationData } = req.body; // Contains fromId, tripId, message, etc. from frontend
    
    try{
        const newNotification = new Notification({
            recipient: recipientId,
            sender: notificationData.fromId,
            trip: notificationData.tripId,
            type: 'trip_invitation',
            // message is not in the new schema, but can be constructed on the frontend
        });
        await newNotification.save();
        res.status(201).json({ message: "Invitation sent successfully." });
    } catch(err){
        console.log("Error sending invitation");
        console.log(err);
        res.status(500).json({ message: "Error sending invitation" });
    }
});

//Set UpiId

app.post("/setUpi/:id",authenticateToken, async (req,res)=>{
    const userId  = req.params.id;
    const upiId = req.body.change.upi;
    try{
        const user = await users.findById(userId);
        user.upiId = upiId;
        await user.save();
        res.status(200).json({message : "UPI id set success"});
    }catch(err){
        console.log(err);
    }
})


//Delete trip
app.post("/deleteTrip/:id", authenticateToken, async (req, res) => {
    const userId = req.params.id;
    const trip = req.body.currTrip;
  
    console.log("trip", trip);
  
    try {
      const user = await users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const iTrip = await trips.findById(trip._id);

      if (user && user._id) {
        console.log("Removingg");
        iTrip.members = iTrip.members.filter(
          n => n._id.toString() !== user._id.toString()
        );
        await iTrip.save();
        console.log(`Removed user with ID: ${user._id} from trip`);
      }
  
      return res.status(200).json({ message: "Trip left successfully." });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });


//   Delete admin
app.delete("/deleteAdmin/:id", authenticateToken, async (req, res) => {
    const tripId = req.params.id;
    try {
      const deletedTrip = await trips.findByIdAndDelete(tripId);
  
      if (!deletedTrip) {
        return res.status(404).json({ message: "Trip not found" });
      }
  
      console.log(`Trip ${tripId} deleted successfully`);
      return res.status(200).json({ message: "Trip deleted successfully" });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  
  //remove user from trip
  app.post("/remove/:tripId", authenticateToken, async (req,res)=>{
    const tripId = req.params.tripId;
    const memberId = req.body.memberId;
    console.log(tripId);
    try{
        const trip = await trips.findById(tripId);

        if (memberId) {
            console.log("Removingg");
            trip.members = trip.members.filter(
              n => n._id.toString() !== memberId.toString()
            );
            await trip.save();
            console.log(`Removed user with ID: ${memberId}`);
          }

    }catch(err){
        console.log(err);
    }
  })

