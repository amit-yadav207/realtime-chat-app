import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()

//for geenrating secret we can use bash shell command: openssl rand base64 32
const generateTokenAndSetCookie = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" })
    return token;
}


export default generateTokenAndSetCookie