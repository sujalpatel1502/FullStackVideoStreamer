
import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

export const addVideo=async(req,res,next)=>{
    console.log("yayayyayayayaya",req.body);
    const newVideo=new Video({
        userId:req.user.id,...req.body
    })
    try {
        const savedVideo=await newVideo.save()
        res.status(200).json(savedVideo)
    } catch (error) {
        console.log("in catchhhhhhh",error);
        next(error)
    }
}

export const updateVideo=async(req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404,"Video not found"));
        if(req.user.id === video.userId){
            const updatedVideo=await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true});
            res.status(200).json(updatedVideo)
        }
        else{
            return next(createError(403,"you can update only your video"))
        }
    } catch (error) {
        next(error)
    }
}

export const deleteVideo=async(req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404,"Video not found"));
        if(req.user.id === video.userId){
            await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("the video has been deleted")
        }
        else{
            return next(createError(403,"you can only delete your video"))
        }
    } catch (error) {
        next(error)
    }
}

export const getVideo=async(req,res,next)=>{
    console.log("cameee with id",req.params.id);
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}
export const view=async(req,res,next)=>{
    try {
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        });
        res.status(200).json("the view has been increased")
    } catch (error) {
        next(error)
    }
}

export const random=async(req,res,next)=>{
    try {
        // will give random 40 videos
        const videos = await Video.aggregate([{$sample:{size:40}}]);
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const trend=async(req,res,next)=>{
    try {
        const videos = await Video.find().sort({views:-1});
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}



export const subVideos=async(req,res,next)=>{
    try {
       const user=await User.findById(req.user.id);
       const subscribedChannels=user.subscribedUsers;
       // promise all to get multiple videos
       const list = await Promise.all(
        subscribedChannels.map((channelId)=>{
                return Video.find({userId:channelId});
        })
       )
       res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt));
    } catch (error) {
        next(error)
    }
}

export const getByTag=async(req,res,next)=>{
    const tags=req.query.tags.split(",");
    console.log("tagssss-s-s-s-s",tags);
    try {
        const videos = await Video.find({tags:{$in:tags}}).limit(20)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const search=async(req,res,next)=>{
    const query=req.query.q
    // console.log("tagssss-s-s-s-s",tags);
    try {
        const videos = await Video.find({title:{$regex:query,$options:"i"}}).limit(20)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

