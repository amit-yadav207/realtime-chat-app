import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullName:
    {
        type: String,
        required: true
    },
    username: {

        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePicture: {
        type: String,
        default: ""
    }
}, { timestamps: true })

export default mongoose.model("User", UserSchema)