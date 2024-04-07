import { useState } from 'react'
import { useAuthContext } from '../context/authContext'
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false)


    const { setAuthUser } = useAuthContext()
    const logout = async () => {
        setLoading(true)
        try {
            const backednURLforDev="http://localhost:5000/"

            const backendURL="https://chat-app-backend-pp0h.onrender.com/"
            const res = await fetch(`${backednURLforDev}api/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

            })


            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.removeItem("access-token")
            localStorage.removeItem("chat-user")

            setAuthUser({})//null objectMADE CHANGeS HERE

            toast.success("LoggedOut Successfully");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }

    return { loading, logout }
}

export default useLogout
