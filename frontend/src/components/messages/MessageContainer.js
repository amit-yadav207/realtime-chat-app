import React, { useEffect, useState, useRef } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from 'react-icons/ti';
import { FaArrowLeft } from "react-icons/fa"; // Import the left arrow icon
import { FaEllipsisV, FaTimes, FaVideo, FaPhone, FaImage, FaFile } from 'react-icons/fa';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/authContext';
import getRandEmoji from "../sidebar/emojis";
import useSendMessage from '../../hooks/useSendMessage';
import VideoCallWindow from './VideoCallWindow';
import axios from 'axios';

const MessageContainer = ({ isOpenSideBar ,setIsOpenSideBar}) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { loading, sendMessage } = useSendMessage();
    const [showOptions, setShowOptions] = useState(false);
    const [showVideoCall, setShowVideoCall] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        return () => {
            setSelectedConversation(null);
            setShowOptions(false);
            setShowVideoCall(false);
        };
    }, [setSelectedConversation]);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const fileUrl = await uploadFile(file);
        await sendMessage(fileUrl);
        setShowOptions(false);
    };

    const uploadFile = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "images_preset");
        try {
            const cloudName = "dfpophk4b";
            const resourceType = "image";
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
            const response = await axios.post(api, data);
            if (response) {
                const { secure_url } = response.data;
                return secure_url;
            }
        } catch (error) {
            console.log("error in uploading file to cloudinary at container");
            console.log(error.message);
        }
    };

    return (


        <div className={`flex flex-col md:w-3/5 w-full h-full `}>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/**top horizontal line to show name and three dotes */}
                    <div className='bg-slate-500 px-2 py-2 mb-1 flex justify-between relative '>
                        <div className='bg-slate-500 flex items-center'>
                            <span className='mr-1 cursor-pointer' onClick={() => setIsOpenSideBar(true)} title='back'><FaArrowLeft /></span>
                            <div className='chat-image avatar mr-2'>
                                <div className='w-8 h-8 rounded-full'>
                                    <img
                                        alt='Bubble chatCompnent'
                                        src={selectedConversation.profilePicture}
                                    />
                                </div>
                            </div>

                            <span className='text-gray-900 font-bold font-xl'> {selectedConversation.fullName}</span>
                            {/*  <span className='font-xl'> {getRandEmoji()}</span>*/}
                        </div>
                        {/**three dots div */}
                        <div>
                            <button onClick={() => setShowOptions(!showOptions)} className='focus:outline-none'>
                                {!showOptions ? (
                                    <FaEllipsisV className="cursor-pointer hover:text-white" />
                                ) : (
                                    <FaTimes className="hover:text-red-500" />
                                )}
                            </button>
                            {showOptions && (
                                <div className='absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10' >
                                    <ul className='py-1'>
                                        <input
                                            type='file'
                                            accept='image/*'
                                            style={{ display: 'none' }}
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                        />
                                        <li className='flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-black ' onClick={() => fileInputRef.current.click()}>
                                            <FaImage className='mr-2' /> Image
                                        </li>

                                        <li className='flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-black' onClick={() => setShowVideoCall(true)}>
                                            <FaVideo className='mr-2' /> Video Call
                                        </li>
                                        <li className='flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-black'>
                                            <FaPhone className='mr-2' /> Audio Call
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <Messages />
                    <MessageInput />
                    {showVideoCall && <VideoCallWindow onClose={() => setShowVideoCall(false)} />}
                </>
            )}
        </div>

    );
};

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center md:text-2xl text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome👋 {authUser.fullName}🌻</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className="text-3xl md:text-6xl text-center" />
                <p className='bg-green-600 py-2 px-4 hover:bg-green-700 rounded-2xl cursor-pointer text-sm md:hidden block' >Start new Conversation</p>
            </div>
        </div>
    );
};

export default MessageContainer;
