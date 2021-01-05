import PostMessge from '../models/postMessage.js';
import mongoose from 'mongoose'

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessge.find();
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessge(post)

    try {

        await newPost.save();
        res.status(201).json(newPost)

    } catch (error) {
        res.status(409).json({ msg: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with that Id`);

    const updatedpost = await PostMessge.findByIdAndUpdate(_id, post, { new: true })

    res.json(updatedpost)
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with that Id`);

    await PostMessge.findByIdAndRemove(_id)

    res.json({message:'post delete succesfully'})
}