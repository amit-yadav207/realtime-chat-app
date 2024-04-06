// import React, { useEffect } from 'react'
// import { useSocketContext } from '../context/socketContext'
// import useConversation from '../zustand/useConversation'


// const useListenMessages = () => {
//     console.log("inside uselisten")
//     const { socket } = useSocketContext()
//     const { messages, setMessages } = useConversation()


//     ///here i ERRRORRRRR IN THISSS PARTAAAAAAAAAA
//     console.log("use listen message scoket ", socket.id)
//     useEffect(() => {
//         socket?.on("newMessage", (newMessage) => {
//             console.log("new message received ", newMessage)
//             setMessages([...messages, newMessage])///here waw bug
//         })


//         console.log("indise use effice of listen ")

//         //upadtedddd 
//         return () => socket?.off("newMessage")

//     }, [socket, setMessages, messages])

// }

// export default useListenMessages


import { useEffect } from "react";

import { useSocketContext } from "../context/socketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();


    useEffect(() => {

        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            // console.log(newMessage)
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);

        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
};
export default useListenMessages;



