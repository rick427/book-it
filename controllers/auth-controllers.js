import cloudinary from 'cloudinary'
import absoluteUrl from 'next-absolute-url';
import crypto from 'crypto';

import User from '@/models/user';
import ErrorHandler from '../utils/error-handler';
import catchAsyncErrors from '@/middlewares/catch-async-error';
import sendEmail from 'utils/sendEmail';

//@: Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

//@ Register user  POST - /api/auth/register
const registerUser = catchAsyncErrors(async (req, res) => {
    const {name, email, password, avatar} = req.body;
    
    const result = await cloudinary.v2.uploader.upload(avatar, {
        folder: 'bookit/avatars',
        width: '150',
        crop: 'scale'
    });

    await User.create({
        name, 
        email, 
        password, 
        avatar: {
            public_id: result.public_id, 
            url: result.secure_url
        }
    });

    res.status(200).json({
        success: true,
        message: 'Account registered successfully'
    });
});


//@ Current user info  GET - /api/me
const currentUser = catchAsyncErrors(async (req, res) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    });
});

//@ Update user info  PUT - /api/me/update
const updateUser = catchAsyncErrors(async (req, res) => {
    const user = await User.findById(req.user._id);
    const {name, email, password, avatar} = req.body;

    if(user){
        user.name = name;
        user.email = email;

        if(password){
            user.password = password
        }
    }

    // update avatar
    if(avatar !== ''){
        const image_id = user.avatar.public_id;

        //delete previous user avatar
        await cloudinary.v2.uploader.destroy(image_id);
        const result = await cloudinary.v2.uploader.upload(avatar, {
            folder: 'bookit/avatars',
            width: '150',
            crop: 'scale'
        });

        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    await user.save();

    res.status(200).json({
        success: true,
        user
    });
});

//@ Forgot password  POST - /api/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler('User not found', 404));
    }

    //get reset token
    const resetToken = await user.getResetPasswordToken();
    console.log(resetToken);

    await user.save({validateBeforeSave: false});

    //get origin
    const {origin} = absoluteUrl(req);

    // create password reset URL
    const resetUrl = `${origin}/password/reset/${resetToken}`;

    const message = `Your password reset url is as follows: \n\n ${resetUrl} \n\n
     If you have not requested this email, ignore it.
    `

    try {
        sendEmail({
            email: user.email,
            subject: 'BookIT Password Recovery',
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message), 500);
    }
});

//@: Reset user password POST - /api/password/reset
const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Hash URL Token
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken, 
        resetPasswordExpire: {$gt: Date.now()}
    });

    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or expired', 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Passwords does not match', 400));
    }

    // Setup the new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password updated successfully'
    })
});

export {
    registerUser,
    currentUser,
    updateUser,
    forgotPassword,
    resetPassword
}