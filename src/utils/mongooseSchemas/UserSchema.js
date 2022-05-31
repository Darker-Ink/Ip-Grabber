const mongoose = require('mongoose');

const StringType = {
    type: String,
    required: true,
};

const UserSchema = new mongoose.Schema({

    id: {
        ...StringType,
        unique: true,
    }, // The user's unique ID. (unique)

    username: {
        ...StringType,
        unique: true,
    }, // The Username of the user (unique)

    email: {
        ...StringType,
        unique: true,
    }, // The Email of the user (unique) (hashed)

    password: StringType, // The Password of the user (hashed)

    ip: StringType, // The IP of the user (hashed)

    role: {
        type: Array,
        required: true,
        default: ['user'],
    }, // The Role of the user (default: user)

    createdAt: {
        type: Date,
        default: Date.now,
    }, // The date when the user was created

    updatedAt: {
        type: Date,
        default: Date.now,
    }, // The Date of the user creation

    lastLogin: {
        type: Date,
        default: Date.now,
    }, // The last time the user logged in

    oldPasswords: {
        type: Array,
        default: [],
    }, // The list of the old passwords of the user (to check if a new password is the same as one of the old ones) (hashed)
})

module.exports = mongoose.model('User', UserSchema);