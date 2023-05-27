const { Schema, default: mongoose } = require('mongoose');

//creating user schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        minlength: 3,
        maxlength: 40,
        match: [/^[A-Za-z]+$/, 'name must be alphabets only']
    },
    email: {
        type: String,
        required: [true, 'you must provide email'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'must provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'must provide the password'],
        minlength: [, 'password must be atleast 8 characters'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, 'must provide correct password']

    },
    gender: {
        type: String,
        required: [true, 'must specify the gender'],
        enum: ['Male', "Female", "Other"],
        default: "Male"
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'must provide Date Of Birth']
    },
    phoneNumber: {
        type: String
    },
    country: {
        type: String
    }

}, { timestamps: true });


module.exports = mongoose.model("User", UserSchema);