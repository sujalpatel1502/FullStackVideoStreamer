import express from "express"
import { verifyToken } from "../verifyToken.js";
import { addVideo, deleteVideo, getByTag, getVideo, random, search, subVideos, trend, updateVideo, view } from "../controllers/video.js";

const router = express.Router();

router.post("/",verifyToken,addVideo)
router.put("/:id",verifyToken,updateVideo)
router.delete("/:id",verifyToken,deleteVideo)
router.get("/find/:id",getVideo)
router.put("/view/:id",view)
router.get("/trend",trend)
router.get("/random",random)
router.get("/sub",verifyToken,subVideos)
router.get("/tags",getByTag)
router.get("/search",search)

export default router