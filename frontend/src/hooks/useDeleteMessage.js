import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from "react-hot-toast";

const useDeleteMessage = () => {

    const [loading, setLoading] = useState(false)
    const {  setMessages, selectedConversation } = useConversation()

    const deleteMessage = async (messageId) => {
        setLoading(true)
        try {

            const token = localStorage.getItem("access-token")
            const res = await fetch(`http://localhost:5000/api/messages/delete/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ messageId })
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            setLoading(false)
            // console.log("data receied on clickings send button", data)
            setMessages(data)//error waas here also

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }
    return { loading, deleteMessage }
}

export default useDeleteMessage


