const User = require('../models/Users');
const ErrorResponse = require ('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


// desc - Register User
//@route Get /api/v1/auth/register
//@access   public

exports.register = async (req,res,next) =>{
    try {
        const {name, email, password, role} = req.body;
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        sendTokenResponse(user,200,res);
        
    } catch (err) {
        console.log(err.message);
        next();
    }
};


// desc - Register User
//@route Get /success
//@access   public

exports.googleSuccess = async (req,res,next) =>{
    const name  = req.user.given_name;
    const email = req.user.email;
    const password = '1234abc';

    try {
        const user = await User.create({
            name,
            email,
            password
        });

        sendTokenResponse(user,200,res,true);
        
    } catch (err) {
        console.log(err.message);
        try{
            const user2 = await User.findOne({name: name});
            sendTokenResponse(user2,200,res, true);

        }catch(e){
            console.log(err.message);
            next();
        }
        next();
    }
    // res.send({name, email})
};


// desc - login User
//@route Get /api/v1/auth/login
//@access   public

exports.login = async (req,res,next) =>{
    try {
        const { email, password} = req.body;
       
        // Validate Email
        if(!email || !password){
            return next(new ErrorResponse('Email and Password required', 400));

        }
        // Check for user
        const user = await  User.findOne ({email}).select('+password');

        if(!user){
            return next(new ErrorResponse('Invalid credentials',401));
        }

        // Check if password matches 
        const match = await user.matchPassword(password);

        if(!match) {
            return next(new ErrorResponse('Invalid credentials',401));
        }

        sendTokenResponse(user,200,res);
        
    } catch (err) {
        next(err);
    }

    
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res, redirect = false) => {
    const token = user.getSignedJwtToken();

    const options = {
        // expires : new Date(Date.now() + process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES),
        httpOnly: true
    };

    var string = encodeURIComponent(token);

    res
    .status(statusCode)
    .cookie('token',token,options)
    .redirect('http://localhost:5000/users');
};