import User from '@/models/user';
import APIFeatures from '../utils/api-features';
import ErrorHandler from '../utils/error-handler';
import catchAsyncErrors from '@/middlewares/catch-async-error';

//@ Register user  POST - /api/auth/register
const registerUser = catchAsyncErrors(async (req, res) => {
    const {name, email, password} = req.body;
    await User.create({
        name, email, password, avatar: {public_id: 'PUBLIC_ID', url: 'URL'}
    });

    res.status(200).json({
        success: true,
        message: 'Account registered successfully'
    });
});

export {
    registerUser
}