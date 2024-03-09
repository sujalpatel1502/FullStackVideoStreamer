
import Video from "../models/Video.js"
import Comment from "../models/Comment.js"
import { createError } from "../error.js";
export const addComent=async(req,res,next)=>{
    const newComent=new Comment({...req.body,userId:req.user.id})
    try {
        const savedComment=await newComent.save();
        res.status(200).json(savedComment)
    } catch (error) {
        next(error)
    }
}

export const deleteComent=async(req,res,next)=>{
    try {
        const comment=await Comment.findById(req.params.id)
        const video=await Comment.findById(req.params.id);
        if(req.user.id==comment.userId || req.user.id==video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("Sucessfully delted the comment")
        }
        else{
            next(createError(403,"you can only delete your comment"))
        }
        
    } catch (error) {
        next(error)
    }
}

export const getComent=async(req,res,next)=>{
    console.log("cameeeeeeeee",req.params.video);
    try {
        const comments=await Comment.find({videoId:req.params.video})
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}