import mongoose from "mongoose";

const Schema = mongoose.Schema

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const userSchema = mongoose.model('users', schema)