import { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from "react-hot-toast";
import useGetConversations from './useGetConversations';
const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const url="https://chat-app-realtime-cd4sq70le-amit-yadavs-projects-ec98a153.vercel.app/"

                const backednURLforDev="http://localhost:5000/"

            const backendURL="https://chat-app-backend-pp0h.onrender.com/"
                const token = localStorage.getItem("access-token")
                const res = await fetch(`${backendURL}api/messages/${selectedConversation._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,
                    },
                })

                const data = await res.json()
                if (data.error) {
                    throw new Error(data.error)
                }

                // console.log("messages at front end ", data)

                /////UPDATED MNTERT ETE
                setMessages(data)
            }
            catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }

        }
        if (selectedConversation?._id) getMessages()
    }, [selectedConversation?._id, setMessages])//////////////UPDATED DDEPWNDUY HERE    IMPORTANTTTT


    return { loading, messages }

}
export default useGetMessages


