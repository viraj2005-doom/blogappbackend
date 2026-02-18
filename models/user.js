const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { createtokenforuser } = require('../service/auth');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default:'/images/useravatar.png',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
        .update(this.password)
        .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

});

userSchema.statics.matchPasswordandgenerateToken = async function(email, password) {
    const user = await this.findOne({ email });

    if (!user) {
        return null;
    }

    const userProvidedHash = createHmac('sha256', user.salt)
        .update(password)
        .digest('hex');

    console.log("Match:", user.password === userProvidedHash);

    if (userProvidedHash === user.password) {
        return createtokenforuser(user);
    }

    return null;
};

const User = mongoose.model('User', userSchema);

module.exports = User;