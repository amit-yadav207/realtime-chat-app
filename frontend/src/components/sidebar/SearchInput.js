import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import toast from "react-hot-toast";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversation();
    const { conversations, setConversations } = useGetConversations();

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);

        if (searchTerm.length >= 3) {
            const conversation = conversations.find(c => c.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
            if (conversation) {
                setSelectedConversation(conversation);
            } else {
                toast.error("No such user found");
            }
        }
    };

    return (
        <div className='flex items-center justify-center w-full '>

            <div className='relative w-full'>
                <input
                    type="text"
                    placeholder='Search...'
                    className=' input  rounded-full pl-10  hover:outline-white w-full'
                    value={search}
                    onChange={handleSearch}
                    
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <IoSearchSharp className='w-6 h-6' />
                </span>
            </div>
        </div>
    );
};

export default SearchInput;
