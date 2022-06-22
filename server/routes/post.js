import express from 'express'
const router = express.Router()
import { skillSchema } from '../models/Post.js'
import verityToken from '../middleware/auth.js'

// @route POST api/post
// @desc Get Post
// @access Private
router.get('/', verityToken, async (req, res) => {
    try {
        const postList = await skillSchema.find({ user: req.userId }).populate('user', ['username'])
        res.json({ success: true, postList })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

// @route POST api/post
// @desc Create Post
// @access Private

router.post('/', verityToken, async (req, res) => {
    const { skills, description, url, status } = req.body
    //SImple validation
    if (!skills)
        return res.status(400).json({ success: false, message: "Skills is required" })

    try {
        const newPost = new skillSchema({
            skills,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        })
        await newPost.save()
        res.json({ success: true, message: 'Happy learning !', skill: newPost })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

// @route POST api/post
// @desc Update Post
// @access Private 

router.put('/:id', verityToken, async (req, res) => {
    const { skills, description, url, status } = req.body

    if (!skills)
        return res.status(400).json({ success: false, message: 'Skills is required' })

    try {
        let updatePost = {
            skills,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'TO LEARN'
        }
        const postUpdateCondition = {
            _id: req.params.id,
            user: req.userId
        }
        updatePost = await skillSchema.findOneAndUpdate(postUpdateCondition, updatePost, { new: true })
        //User not authorised to update post
        if (!updatePost)
            return res.status(401).json({ success: false, message: 'Post not found or user not authorised' })

        res.json({ success: true, message: 'Good joob', post: updatePost })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }

})

// @route DELETE api/post
// @desc DELETE Post
// @access Private 

router.delete('/:id', verityToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletePost = await skillSchema.findOneAndDelete(postDeleteCondition)

        //User not authorised delete post
        if (!deletePost)
            return res.status(401).json({ success: false, message: 'Post not found or user not authorised' })
        res.json({ success: true, message: 'Delete success joob', post: deletePost })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})
export default router