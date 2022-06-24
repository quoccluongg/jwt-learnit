import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/auth.js'
import postRouter from './routes/post.js'
import cors from 'cors'
const URI = `mongodb+srv://luongdq3:luong123123@mern-learnit.hy0tnpi.mongodb.net/?retryWrites=true&w=majority`;


const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        })
        console.log("🚀 ~ file: index.js ~ line 14 ~ connectDB ~ mongoose", mongoose)
    } catch (error) {
        console.log("🚀 ~ file: index.js ~ line 16 ~ connectDB ~ error", error.message)
        process.exit(1)
    }
}
connectDB()
const app = express()
app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/posts',postRouter)
app.use(cors())
const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

