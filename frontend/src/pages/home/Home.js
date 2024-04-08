import React, {useState} from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

const Home = () => {
   
   
    return (
        <div className=' flex-col md:flex-row flex min-h-full max-h-full rounded-lg overflow-auto bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  lg:w-3/5 w-11/12 '>
            <Sidebar />
            <MessageContainer  />
        </div>
    )
}

export default Home
