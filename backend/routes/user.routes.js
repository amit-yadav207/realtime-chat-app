import express from "express";
import {getUsersForSidebar} from "../controllers/user.controllers.js"
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router()




router.get("/", protectRoute, getUsersForSidebar)//only loggedIn users can call this route

export default router