const express = require('express');
const router = express.Router();
const app = express();
const users = require('../models/users');
const trips = require('../models/trips');
const {authenticateToken} = require("../utilities");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const cors = require("cors");


app.use(cors());
app.use(express.json())

const EventEmitter = require('events');
const userEvents = new EventEmitter();
userEvents.setMaxListeners(20); 


//New user regiter route
router.post('/signup', async (req, res) => {
    try {
        let { Fullname, Username, Email, Password } = req.body.users;
        let check = await users.findOne({ email: Email });
        if (check) {
            console.log("Email already in use");
            return res.status(400).send({ message: "Email already in use" });
        } else {
            const hashedPassword = await bcrypt.hash(Password, 10); // 10 is the salt
            let user = new user({
                fullname: Fullname,
                username: Username,
                email: Email,
                password: hashedPassword,
            });
            user.save()
                .then(() => {
                    console.log("User added successfully");
                    res.send({ message: "User added Successfully" });
                    const accessToken = jwt.sign(
                        { user },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: "3600m",
                        }
                    );
                    return res.json({
                        error: false,
                        user,
                        accessToken,
                        message: "Registration Successful",
                    });
                }).catch((err) => {
                    console.log(err);
                    res.json({ message: "Username already exists" }); // Fixed typo
                });
        }
    } catch (err) {
        console.log(err); // Fixed error handling
        res.status(500).send({ message: "Server error" }); // Send response for server error
    }
});


//existing use login route
router.post("/login",async (req,res)=>{
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
                message:"User does not exist, Create a new user",
            });
            console.log("User does not exist, Create a new user");
        }
    }catch(err){
        console.log(err);
    }
});
