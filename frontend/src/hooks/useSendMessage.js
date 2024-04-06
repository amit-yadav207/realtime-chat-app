import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from "react-hot-toast";

const useSendMessage = () => {

    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()

    const sendMessage = async (message) => {
        setLoading(true)
        try {

            const token = localStorage.getItem("access-token")
            const res = await fetch(`http://localhost:5000/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ message })
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            setLoading(false)
            // console.log("data receied on clickings send button", data)


        /////CHNAGED HEREEEEEEEEEE**************
            setMessages([...messages, data])//error waas here also

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }
    return { loading, sendMessage }
}

export default useSendMessage


