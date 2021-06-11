import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be more than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// Encrypt password before saving user
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//Compare user password
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// Generate password reset token
userSchema.methods.getResetPasswordToken = async function (){
    // generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hash and set token
    this.resetPasswordToken = crypto.createHash('sha258')
        .update(resetToken)
        .digest('hex')
    
    // Set token expiry
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000 // 30 minutes

    return resetToken;
}

export default mongoose.models.User || mongoose.model('User', userSchema);