import express from "express"
import { verifyToken } from "../verifyToken.js";
import { addComent, deleteComent, getComent } from "../controllers/comment.js";
const router = express.Router();

router.post("/",verifyToken,addComent);
router.delete("/:id",verifyToken,deleteComent);
router.get("/:video",verifyToken,getComent);


export default router