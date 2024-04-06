import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import toast from "react-hot-toast";


import useGetConversations from "../../hooks/useGetConversations"


const SearchInput = () => {

    const [search, setSearch] = useState("")

    const { setSelectedConversation } = useConversation()
    const { conversations, setConversations } = useGetConversations()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!search) return
        if (search.length < 3) {
            //use toast to show errro in front end
            toast.error("search length atleast 3")
            return
        }

        const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))

        if (conversation) {
            
            setSelectedConversation(conversation)
            setSearch("")
        } else {
            toast.error("No such user found")
        }
    }
    return (
        <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input
                type="text" placeholder='Search...' className='input input-bordered rounded-full'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit' className='btn btn-circle bg-sky-500 text-white outline-none'>
                <IoSearchSharp className='w-6 h-6 ' />
            </button>
        </form>
    )
}

export default SearchInput
