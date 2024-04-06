// //if there is JWt token presnt in cookies then we can verify user and send its id in res
// //and call next function for invoinf sendMessage controller fun

// //import user model

// import User from "../models/user.model.js"
// import jwt from "jsonwebtoken"

// const protectRoute = async (req, res, next) => {
//     try {
//         //here cookie parser middleware will help you
//         //add that middle ware in server

//         const authHeader = req.headers['authorization'];
//         const token = authHeader && authHeader.split(' ')[1];
//         console.log("got token", token)
//         if (!token) {
//             return res.status(200).json({ error: "No token, Unauthenticated user" })
//         }
//         //if token but not verified
//         console.log("yes got token", token)

//         const verified = jwt.verify(token, process.env.JWT_SECRET)//will return userID in verified 
//         console.log("verified ")

//         if (!verified) {
//             return res.status(401).json({ error: "Token Invalid, Unauthorized accesss" })
//         }

//         //now find the user having userID as id and set req atribute with that user 
//         //but remove password before sending it as req body

//         const user = await User.findById(verified.userId).select("-password")//removed password

//         console.log(user)
//         //set this user in req body
//         if (!user) {
//             return res.status(401).json({ error: "User not found!" })
//         }
//         req.user = user

//         next()//call next function i.e sendMessage

//     } catch (error) {
//         res.status(500).json({ error: "protec router rrprr " })
//     }
// }


// export default protectRoute



import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        let token = authHeader && authHeader.split(' ')[1];
        // let token = req.cookies.jwt
        if (!token) {
            return res.status(200).json({ error: "No token, Unauthenticated user" });
        }


        //chnagere HERE******************
        // console.log()
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("verified ", verified);

        if (!verified) {
            return res.status(401).json({ error: "Token Invalid, Unauthorized access" });
        }

        const user = await User.findById(verified.userId).select("-password");

        if (!user) {
            return res.status(401).json({ error: "User not found!" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Error during token verification:", error);
        res.status(500).json({ error: "Token verification failed" });
    }
};

export default protectRoute;
