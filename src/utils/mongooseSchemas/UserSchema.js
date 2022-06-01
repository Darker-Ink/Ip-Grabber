const mongoose = require('mongoose');

const StringType = {
    type: String,
    required: true,
};

const DateTypeNull = {
    type: Date,
    default: null,
    required: false,
}

const DateTypeNow = {
    type: Date,
    default: Date.now,
}

const StringTypeUnique = {
    ...StringType,
    unique: true,
}

const StringTypeUNR = {
    ...StringType,
    default: null,
    unique: true,
    required: false,
}

const StringTypeNR = {
    ...StringType,
    default: null,
    required: false,
}

const UserSchema = new mongoose.Schema({

    id: StringTypeUnique, // The user's unique ID. (unique)

    username: StringTypeUnique, // The Username of the user (unique)

    email: StringTypeUnique, // The Email of the user (unique) (hashed)

    password: StringType, // The Password of the user (hashed)

    ip: StringType, // The IP of the user (hashed)

    role: {
        type: Array,
        required: true,
        default: ['user'],
    }, // The Role of the user (default: user)

    createdAt: DateTypeNow, // The date when the user was created

    updatedAt: DateTypeNow, // The Date of the user creation

    lastLogin: DateTypeNow, // The last time the user logged in

    oldPasswords: {
        type: Array,
        default: [],
    }, // The list of the old passwords of the user (to check if a new password is the same as one of the old ones) (hashed)

    resetPasswordToken: StringTypeUNR, // The token to reset the password (hashed)

    resetPasswordExpires: DateTypeNull, // The expiration date of the reset password token

    banned: {
        type: Boolean,
        default: false,
    }, // If the user is banned

    bannedUntil: DateTypeNull, // The date when the user will be unbanned

    bannedReason: StringTypeNR, // The reason why the user is banned

    bannedBy: {
        ref: 'User',
        default: null,
        required: false,
    }, // The user who banned the user

    ips: {
        type: Array,
        default: [],
        required: false,
    }, // The list of the IPs of the user (hashed)

    loginToken: StringTypeUNR, // The login token if the login attempt is suspicious (hashed)

    loginTokenExpires: DateTypeNull, // The expiration date of the login token

    emailVerificationToken: StringTypeUNR, // The token to verify the email (hashed)

    emailVerificationExpires: DateTypeNull, // The expiration date of the email verification token

    blocked: {
        type: Boolean,
        default: false,
        required: false
    }, // If the user is blocked from logging in

    blockedUntil: DateTypeNull, // The date when the user will be unblocked

    blockedReason: StringTypeNR, // The reason why the user is blocked
})

module.exports = mongoose.model('User', UserSchema);