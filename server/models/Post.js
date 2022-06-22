import mongoose from "mongoose"

const Schema = mongoose.Schema


const schema = new Schema({
    skills: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    url: {
        type: String
    },
    status: {
        type: String,
        enum: ['TO LEARN','LEARNING', 'LEARNED']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

export const skillSchema = mongoose.model('skill',schema)