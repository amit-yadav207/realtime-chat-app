import { useState } from 'react'
import { useAuthContext } from '../context/authContext'
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState(false)

    const { setAuthUser } = useAuthContext()

    const signup = async ({ fullName, username, password, confirmPass, gender }) => {
        //errror checking function goes here

        //suppose sucess, now use try catch and save user in database

        try {
            const url="https://chat-app-realtime-cd4sq70le-amit-yadavs-projects-ec98a153.vercel.app/"

            const backednURLforDev="http://localhost:5000/"

            const backendURL="https://chat-app-backend-pp0h.onrender.com/"
            const res = await fetch(`${backendURL}api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullName, username, password, confirmPass, gender })
            })

            const data = await res.json();//!!!making it await is very important
            if (data.error) {
                throw new Error(data.error)
            }

            // *********************NEED  A CHNAGE HEREEEE*****************
            localStorage.setItem("access-token", data.accessToken)//store in local storage for access
            localStorage.setItem("chat-user", JSON.stringify(data.user))
           
            const userLogged = JSON.parse(localStorage.getItem("chat-user"))
            console.log("userlogged ", userLogged)
            setAuthUser(userLogged)//store info about logged user object format
            toast.success("SignedUp Successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return [loading, signup]
}

export default useSignup
