const mongoose = require('mongoose');
const express = require('express');
const app = express();
const methodOverride = require("method-override");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const users = require("./models/users.js")
const trips = require("./models/trips.js")
const user = require('./routes/users.js')
const cors = require('cors');
//const userRoutes = require('./routes/users.js');


app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());    
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
        trips : isUser.trips,
        upiId : isUser.upiId,
        notifications: isUser.notifications,
      },
      message: "",
    });
  });


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
      });
  
      await newTrip.save();
  
      iUser.trips.push({
        _id: newTrip._id,  
        tripname: newTrip.tripname,
        createdAt: newTrip.createdAt, 
        status: newTrip.status
      });
      
      await iUser.save();
  
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
        const data = await users.findById(user._id);
        const tripList = data.trips;
        return res.json(tripList);
    }catch(err){
        console.log(err);
        return res.status(500).json({error:true,message:"Server Error"});
    }
});

app.get("/getTrip/:id",authenticateToken, async (req,res)=>{
    try{
        const _id  = req.params.id;
        //console.log(_id);
        const indiTrip = await trips.findById({_id});
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

    const tripToSave = {
        _id: tripData.TripId,
        tripname: tripData.Tripname,
        createdAt: tripData.CreatedAt,
    }

    user.trips.push(tripToSave);
    await user.save().then(()=>{
        console.log("Saved success");
    })

    const fiTrip = await trips.findById({_id: tripData.TripId});
    //const members = fiTrip.members;
    //console.log(members);

    const member ={
        username : user.username,
        fullname : user.fullname,
        _id : user._id,
        totalSpend: "",
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
        const info = req.body.info;

        // Find the user by ID
        const user = await users.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add trip to the user's trips if not already present
        const tripToSave = {
            _id: tripData.TripId,
            tripname: tripData.Tripname,
            createdAt: tripData.CreatedAt,
        };
        
        // Ensure the trip is not added multiple times
        if (!user.trips.some(trip => trip._id.toString() === tripToSave._id)) {
            user.trips.push(tripToSave);
            await user.save();
            console.log("Trip saved to user successfully.");
        }

        // Find the trip by ID
        const fiTrip = await trips.findById(tripData.TripId);
        if (!fiTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        // Check if the member exists in the trip's members array (by _id or username)
        const existingMember = fiTrip.members.find(
            (member) => member._id.toString() === user._id.toString() || member.username === user.username
        );


        if (info && info._id) {
            console.log("Removingg");
            user.notifications = user.notifications.filter(
                n => n._id.toString() !== info._id.toString()
            );
            await user.save();
            console.log(`Removed notification with ID: ${info._id}`);
        }
        
        // If the member does not exist, add them to the trip
        if (!existingMember) {
            const newMember = {
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                email: user.email, // Include the user's email
                totalSpend: 0, // or initialize with any value you prefer
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
    const currUser = req.body.currUser;
    const _id = currUser._id;
    const info = req.body.info;

    try{
        const user = await users.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (info && info._id) {
            console.log("Removingg");
            user.notifications = user.notifications.filter(
                n => n._id.toString() !== info._id.toString()
            );
            await user.save();
            console.log(`Removed notification with ID: ${info._id}`);
        }

        res.status(200).json({message: "Notification removed"});
    }catch(err){
        //error
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
        const { user } = req.user; // Assuming authenticateToken attaches { user: userObject } to req.user

        // Find the logged-in user in the members array
        const memberIndex = trip.members.findIndex(m => m._id.toString() === user._id.toString());
        if (memberIndex === -1) {
            return res.status(404).json({ message: 'User not found in trip members' });
        }

        // Update totalSpend
        trip.members[memberIndex].totalSpend += amount;

        // Create new payment history entry
        const newPayment = {
            _id: user._id.toString(),
            username: trip.members[memberIndex].username,
            fullname: trip.members[memberIndex].fullname,
            spend: amount,
            where,
            createdAt: new Date(),
        };

        trip.paymentHistory.push(newPayment);

        // Save the trip
        await trip.save();

        res.status(200).json({ message: 'Spend added successfully', trip });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


app.get('/:tripId/paymentHistory', async (req, res) => {
    const { tripId } = req.params;

    try {
        // Find the trip by ID
        const trip = await trips.findById(tripId);

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found.' });
        }

        // Respond with the payment history
        return res.status(200).json(trip.paymentHistory);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while fetching payment history.' });
    }
});


//Email logic
const transporter = nodemailer.createTransport({
    service: 'gmail', // Change to your email service provider if different
    auth: {
        user: 'fairsharebusiness@gmail.com', // Replace with your email address
        pass: 'rwej zaia gxyg tsss'   // Replace with your email password or app-specific password if using Gmail
    }
});

//Main logic


app.post('/api/trip/end/:tripId',authenticateToken, async (req, res) => {
    const tripId = req.params.tripId;
    const userO = req.user.user;
    const userId = userO._id;
    console.log(userId);

    try {
        // Fetch the trip
        const trip = await trips.findById(tripId);
        
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
            _id: member._id,
            fullname: member.fullname,
            username: member.username,
            email: member.email, // Ensure email is included for sending notifications
            balance: member.totalSpend - perMemberShare,
            owed: []
        }));

        // Separate into owers and receivers
        let owers = balances.filter(member => member.balance < 0);
        let receivers = balances.filter(member => member.balance > 0);

        // Step 3: Match owers and receivers
        const transactions = [];
        let i = 0, j = 0;

        while (i < owers.length && j < receivers.length) {
            const oweAmount = Math.abs(owers[i].balance);
            const receiveAmount = receivers[j].balance;

            const transactionAmount = Math.min(oweAmount, receiveAmount);
            transactions.push({
                fromMemberId: owers[i]._id,
                toMemberId: receivers[j]._id,
                amount: transactionAmount,
                fromMemberFullname: owers[i].fullname,
                fromMemberUsername: owers[i].username,
                toMemberFullname: receivers[j].fullname,
                toMemberUsername: receivers[j].username,
            });

            // Adjust balances
            receivers[j].balance -= transactionAmount;
            owers[i].balance += transactionAmount;

            if (owers[i].balance === 0) i++;
            if (receivers[j].balance === 0) j++;
        }

        // Step 4: Update owed array for each member
        transactions.forEach(transaction => {
            const ower = balances.find(member => member._id.toString() === transaction.fromMemberId.toString());
            if (ower) {
                ower.owed.push({
                    toMemberId: transaction.toMemberId,
                    amount: transaction.amount,
                    toMemberFullname: transaction.toMemberFullname,
                    toMemberUsername: transaction.toMemberUsername,
                });
            }
        });

        // Step 5: Save balances and owed arrays
        trip.members.forEach(member => {
            const updatedMember = balances.find(b => b._id.toString() === member._id.toString());
            if (updatedMember) {
                member.balance = updatedMember.balance;
                member.owed = updatedMember.owed;
            }
        });

        // Step 6: Save transactions to suggestedPayments in the trip document
        trip.suggestedPayments = transactions.map(t => ({
            fromMemberId: t.fromMemberId,
            fromMemberFullname: t.fromMemberFullname,
            fromMemberUsername: t.fromMemberUsername,
            toMemberId: t.toMemberId,
            toMemberFullname: t.toMemberFullname,
            toMemberUsername: t.toMemberUsername,
            amount: t.amount
        }));

        // Update the status of the trip to 'completed'
        trip.status = 'completed'; // Set the status to 'completed' when the trip ends

        await trip.save(); // Save the updated trip

        const user = await users.findById(userId); // Ensure the user is fetched from the database

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the trip in the user's trips array and update its status
        const tripIndex = user.trips.findIndex(t => t._id.toString() === tripId); // Find the index of the trip in the user's trips array
        if (tripIndex !== -1) {
            user.trips[tripIndex].status = 'completed'; // Update the status to 'completed'
            await user.save(); // Save the updated user
        }

        // Step 7: Send an email to each member
        const emailPromises = trip.members.map(member => {
            const mailOptions = {
                from: 'farisharebusiness@gmail.com',
                to: member.email, // Use each member's email
                subject: `Your Trip "${trip.tripname}" Has Ended`,
                text: `
                    Hi ${member.fullname},
    
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

        // Wait for all emails to be sent
        await Promise.all(emailPromises);

        // Response data
        const result = {
            totalTripCost,
            perMemberShare,
            members: trip.members.map(member => ({
                fullname: member.fullname,
                username: member.username,
                totalSpend: member.totalSpend,
                owed: member.owed,
                balance: member.balance,
            })),
        };

        // Send the response
        res.status(200).json(result);

    } catch (error) {
        console.error("Error ending trip or sending emails:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Assuming you already have your Trips model imported
app.get("/tripSuggestions/:tripId",authenticateToken, async (req, res) => {
    const { tripId } = req.params;

    try {
        // Find the trip by its ID
        const trip = await trips.findById(tripId);

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        // Extract suggested payments
        const suggestions = trip.suggestedPayments.map(suggestion => ({
            fromMemberFullname: suggestion.fromMemberFullname,
            fromMemberUsername: suggestion.fromMemberUsername,
            toMemberUsername: suggestion.toMemberUsername,
            toMemberFullname: suggestion.toMemberFullname,
            fromMemberId: suggestion.fromMemberId,
            toMemberId: suggestion.toMemberId,
            amount: suggestion.amount,
        }));

        console.log("----------------------------------------------------");
        console.log(suggestions);
        res.status(200).json({ suggestions });
    } catch (error) {
        console.error("Error fetching trip suggestions:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// Notifications

app.post("/invitations/:userId",authenticateToken, async (req,res)=>{
    const { userId } = req.params;
    const { notification } = req.body;
    const tripId = notification.tripId;
    console.log(req.body);
    try{
        const user = await users.findById(userId);
        user.notifications.push(notification);
        await user.save();
    }catch(err){
        console.log("Error adding notification");
        console.log(err);
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




