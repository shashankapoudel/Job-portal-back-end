import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from "bcryptjs"
import JWT from 'jsonwebtoken';

// schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Require']
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'email is Require'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        // minlength: [6, "password length should be greater than six character"],
        select: true,
    },
    location: {
        type: String,
        default: 'mumbai'
    }

}, { timeStamps: true });
//middlewares
userSchema.pre('save', async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);

})

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}
//JSON WEBTOKEN
userSchema.methods.createJWT = function () {
    return JWT.sign({ userID: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}
export default mongoose.model("User", userSchema);