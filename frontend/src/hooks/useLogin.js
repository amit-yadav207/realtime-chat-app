
import { useState } from 'react'
import { useAuthContext } from '../context/authContext'
import toast from "react-hot-toast";

const useLogin = () => {

    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const login = async ({ username, password }) => {
        setLoading(true)

        try {
            const backednURLforDev="http://localhost:5000/"

            const backendURL="https://chat-app-backend-pp0h.onrender.com"
            const res = await fetch(`${backendURL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }

            ///need TO UPDATE HERE TOOOOO
            console.log(res.cookies)
            localStorage.setItem("access-token", data.accessToken)
            localStorage.setItem("chat-user", JSON.stringify(data.user))
            
            const userLogged = JSON.parse(localStorage.getItem("chat-user"))
            setAuthUser(userLogged)//store info about logged user object format
            toast.success("LoggedIn Successfully");

        }catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }
    return { loading, login }
}

export default useLogin
