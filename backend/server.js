// import express from "express"
// import dotenv from "dotenv"
// import dbConnect from "./db/dbConnect.js"
// import authRoutes from "./routes/auth.routes.js"
// import messageRoutes from "./routes/message.routes.js"
// import userRoutes from "./routes/user.routes.js"
// import cookieParser from "cookie-parser";
// import cors from "cors"

// // const app = express();

// import { app, server } from "./socket/socket.js"
// dotenv.config()
// const PORT = process.env.PORT || 5000
// ///middlware for parsing data in json format

// app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Credentials', 'true');

//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// });
// // app.use(cors())
// app.use(cookieParser())//for getting userid from cookies we need cookie parser
// app.use(express.json())

// // app.get("/", (req, res) => {
// //     res.send("get some resource from here! ")
// // })



// //using middle wares that help us to create routes with less code 

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);



// server.listen(PORT, () => {
//     //connectiong to database
//     dbConnect()
//     console.log(`Server is running at port ${PORT}`)
// })


import express from "express";
import path from "path"
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// const app = express();

// Middleware for parsing data in JSON format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // For getting user ID from cookies, we need cookie parser

// CORS middleware
app.use(cors());


const __dirname = path.resolve()



// // CORS headers
// app.use((req, res, next) => {

//     //http://localhost:3000   chenged herre HEREEE**************
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Credentials', 'true');

//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// });

// Using middleware to create routes with less code
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.get('/',(req,res)=>{
    res.json("message:success")
})

// app.use(express.static(path.join(__dirname, "/frontend/build")))

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
// })

server.listen(PORT, () => {
    // Connecting to database
    dbConnect();
    console.log(`Server is running at port ${PORT}`);
});
