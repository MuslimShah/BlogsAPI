const { Schema, default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//creating user schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        minlength: 3,
        maxlength: 40,
        // match: [/^[A-Za-z]+$/, 'name must be alphabets only']
    },
    email: {
        type: String,
        required: [true, 'you must provide email'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'must provide a valid email'],
        unique: [true, 'must provide a unique email']
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

//hasing password before saving into db
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
//comparing password...
UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatched = bcrypt.compare(candidatePassword, this.password);
    return isMatched;
}

//creating token
UserSchema.methods.createToken = async function() {
    const secretKey = process.env.JWT_SECRET;
    const payLoad = { userId: this._id, name: this.name };
    return jwt.sign(payLoad, secretKey, { expiresIn: process.env.JWT_LIFETIME });
}



module.exports = mongoose.model("User", UserSchema);