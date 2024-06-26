import { useEffect, useState } from 'react'
import toast from "react-hot-toast";
const useGetConversations = () => {

    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {

                const url="https://chat-app-realtime-cd4sq70le-amit-yadavs-projects-ec98a153.vercel.app/"
             const backednURLforDev="http://localhost:5000/"

            const backendURL="https://chat-app-backend-pp0h.onrender.com/"
                const token = localStorage.getItem("access-token")
                const res = await fetch(`${backendURL}api/users`, {
                    method: "GET",
                    headers: {

                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,

                    }

                })
                const data = await res.json()

                if (data.error) {
                    throw new Error(data.error)
                }


                setConversations(data)


            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getConversations()
    }, [])

    return { loading, conversations }
}

export default useGetConversations
