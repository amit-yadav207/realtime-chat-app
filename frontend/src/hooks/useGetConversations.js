import { useEffect, useState } from 'react'
import toast from "react-hot-toast";
const useGetConversations = () => {

    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                const token = localStorage.getItem("access-token")
                const res = await fetch("http://localhost:5000/api/users", {
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
