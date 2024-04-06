import express from "express";
import { sendMessage ,getMessages,deleteMessage} from "../controllers/message.controllers.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router()




//router for getting all the message b/w current loggedIn user to receiverId:id
router.get("/:id", protectRoute, getMessages)//before callings sendMessage first check who is loggedIn by using middleware


//router for sending message from current loggedIn user to receiverId:id
router.post("/send/:id", protectRoute,sendMessage)//before callings sendMessage first check who is loggedIn by using middleware
router.post("/delete/:id", protectRoute,deleteMessage)//before callings sendMessage first check who is loggedIn by using middleware




export default router