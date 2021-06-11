import User from '@/models/user';
import APIFeatures from '../utils/api-features';
import ErrorHandler from '../utils/error-handler';
import cloudinary from 'cloudinary'
import catchAsyncErrors from '@/middlewares/catch-async-error';

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

export {
    registerUser,
    currentUser
}