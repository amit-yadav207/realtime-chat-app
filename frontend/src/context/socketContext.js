// import { createContext, useContext, useEffect, useState } from "react";
// import {  useAuthContext } from "./authContext";
// import io from "socket.io-client"
// export const SocketContext = createContext()


// export const useSocketContext=()=>{
//     return useContext(SocketContext)
// }

// export const SocketContextProvider = ({ children }) => {

//     const [socket, setSocket] = useState(null)
//     const [onlineUsers, setOnlineUsers] = useState([])
//     const { authUser } = useAuthContext()

//     useEffect(() => {
//         if (authUser) {
//             const socket = io("http://localhost:5000", {
//                 query: {
//                     userId: authUser._id
//                 }
//             })
//             setSocket(socket)

//             socket.on("getOnlineUsers",(users)=>{
//                 setOnlineUsers(users)
//             })


//             return () => socket.close();
//         } else {
//             if (socket) {
//                 socket.close();
//                 setSocket(null)
//             }
//         }

//     }, [authUser])



//     return (
//         <SocketContext.Provider value={{ socket, onlineUsers }}>
//             {children}
//         </SocketContext.Provider>
//     )
// }



import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        const connectSocket = () => {
            try {
                const newSocket = io("http://localhost:5000", {
                    query: {
                        userId: authUser._id
                    }
                });
                setSocket(newSocket);
                if (newSocket) {
                    console.log("connected")
                }

                newSocket.on("getOnlineUsers", (users) => {
                    setOnlineUsers(users);
                });


                return () => newSocket.close();
            } catch (error) {
                console.error("Error connecting to socket:", error);
            }
        };

        if (Object.keys(authUser).length !== 0) {
            connectSocket();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
