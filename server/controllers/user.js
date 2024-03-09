import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"
export const update=async(req,res,next)=>{
if(req.params.id === req.user.id){
    try {
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}else{
    return next(createError(403,"you can only update your account"))
}



}






export const deleteUser=async(req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user has been deleted")
        } catch (error) {
            next(error)
        }
    }else{
        return next(createError(403,"you can only delete your account"))
    }
}

export const getUser=async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const subscribe=async(req,res,next)=>{
    console.log(req.user.id,req.params.id);
    try {
        await User.updateOne({_id:req.user.id},{
            $push:{subscribedUsers:req.params.id},
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1}
        })
        res.status(200).json("Subscription sucessfull")
    } catch (error) {
        next(error)
    }
}

export const unsubscribe=async(req,res,next)=>{
    try {
        await User.updateOne({_id:req.user.id},{
            $pull:{subscribedUsers:req.params.id},
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:-1}
        })
        res.status(200).json("UnSubscription sucessfull")
    } catch (error) {
        next(error)
    }
}
export const like=async(req,res,next)=>{
    const id=req.user.id;
    const videoId=req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId,{
            // e can use push but what if user likes the vidoe again it will push same id twice thats why addToSet
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })
        res.status(200).json("The video has been liked")
    } catch (error) {
        next(error)
    }
}
export const dislike=async(req,res,next)=>{
    const id=req.user.id;
    const videoId=req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
        res.status(200).json("The video has been disliked")
    } catch (error) {
        next(error)
    }
}