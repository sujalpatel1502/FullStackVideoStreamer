import jwt from "jsonwebtoken"
import { createError } from "./error.js";

export const verifyToken=(req,res,next)=>{
    // console.log("cameeeeeeeeeee-e-e-e--e-e-e-e-e-e-e-e-e--e-e");
    const token = req.cookies.access_token;

    if(!token) return next(createError(401,"you are not authenticated"));

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(403,"Token is not valid"));
        // console.log("oookkokookokokok",user);
        req.user=user;
        next();
    })

}