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
        next(err);
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        // expires : new Date(Date.now() + process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES),
        httpOnly: true
    };

    res
    .status(statusCode)
    .cookie('token',token,options)
    .json({
        success: true,
        token
    });
};