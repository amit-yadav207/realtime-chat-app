import React, { useEffect } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
import useConversation from '../../zustand/useConversation'
import { useState } from 'react'
const Home = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const [isOpenSideBar, setIsOpenSideBar] = useState(true);
    useEffect(() => {
        setIsOpenSideBar(!isOpenSideBar)
    }, [setSelectedConversation,selectedConversation])
    return (
        <div className=' flex-col md:flex-row flex min-h-full max-h-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  lg:w-3/5 w-11/12 '>
            <Sidebar isOpenSideBar={isOpenSideBar} />
            <MessageContainer isOpenSideBar={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} />
        </div>
    )
}

export default Home
