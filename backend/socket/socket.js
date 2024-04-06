// import { Server } from "socket.io";
// import http from 'http'
// import express from 'express'
// import cors from 'cors'


// const app = express()
// app.use(cors());
// const server = http.createServer(app)

// const io = new Server(server,
//     {
//         cors: {
//             origin: ['http://localhost:3000'],
//             methods: ["GET", "POST"]
//         }
//     })

// // console.log("io", io)
// const userSocketMap = []  //{userId:socketId}


// export const getReceiverSocketId = (receiverId) => {
//     return userSocketMap[receiverId]
// }


// io.on('connection', (socket) => {
//     console.log("a user connected ", socket.id)
//     const userId = socket.handshake.query.userId

//     if (userId != "undefined") userSocketMap[userId] = socket.id
//     console.log("usermap", userSocketMap[userId])
//     console.log("user DI ", userId)


//     io.emit("getOnlineUsers", Object.keys(userSocketMap))// send events to all clients



//     socket.on("disconnect", () => {
//         console.log("user disconnected ", socket.id)

//         delete userSocketMap[userId]
//         //now send this event toa ll use

//         io.emit("getOnlineUsers", Object.keys(userSocketMap))// send events to all clients


//     })
// })

// export { app, io, server }


import { Server } from "socket.io";
import http from 'http';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",//all origin allowed
        methods: ["GET", "POST"],
        credentials: true
    }
});

const userSocketMap = {}; // Use object instead of array
const socketUserMap = {}; // Use object instead of array



export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

io.on('connection', (socket) => {
    console.log("A user connected: ", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
        socketUserMap[socket.id] = userId;
        // console.log("User map:", userSocketMap[userId]);
        console.log("User ID:", userId);
    }
    // socket.broadcast.emit("welcome", `Welcome to the Server! socket having id  ${socket.id} joined the server`)


    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Send events to all clients




    ///////////////////////////////

    socket.on('user:call', ({ to, offer }) => {
        console.log("bg", to, offer);
        // Now the server will send it to the receiver socket as an incoming call
        console.log(userSocketMap[to], socketUserMap[socket.id]);
        // { from: socketUserMap[socket.id], offer }
        io.to(userSocketMap[to]).emit('incoming:call', { from: socketUserMap[socket.id], offer:offer });
    });
    

    ////////////////////////////

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        // console.log("User disconnected id:", userId);

        if (userId !== undefined) {
            delete userSocketMap[userId];
            // Now send this event to all users
            io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Send events to all clients
        }
    });
});

export { app, io, server };
