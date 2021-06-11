import catchAsyncErrors from './catch-async-error';
import ErrorHandler from '../utils/error-handler';
import {getSession} from 'next-auth/client';

const isAuthenticated = catchAsyncErrors(async (req, _, next) => {
    const session = await getSession({req});

    if(!session){
        return next(new ErrorHandler('Login to access this resource', 401));
    }

    req.user = session.user;
    next();
});

export {isAuthenticated};