// import { useEffect, useState, useRef } from 'react'
// import Messages from './Messages'
// import MessageInput from './MessageInput'
// import { TiMessages } from 'react-icons/ti';
// import { FaEllipsisV, FaTimes } from 'react-icons/fa';
// import useConversation from '../../zustand/useConversation';
// import { useAuthContext } from '../../context/authContext';
// import { FaImage, FaFile, FaVideo, FaPhone } from 'react-icons/fa'
// import getRandEmoji from "../sidebar/emojis"
// import useSendMessage from '../../hooks/useSendMessage'
// import axios from 'axios'

// const MessageContainer = () => {


//     const { selectedConversation, setSelectedConversation } = useConversation()
//     const [showOptions, setShowOptions] = useState(false)

//     const { loading, sendMessage } = useSendMessage()
//     const dropdownRef = useRef(null);
//     const fileInputRef = useRef(null);

//     //now when logout selected person should also disappear

//     useEffect(() => {
//         //clean up
//         return () => {
//             setSelectedConversation(null)
//             setShowOptions(false)
//         }
//     }, [setSelectedConversation])




//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setShowOptions(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);




//     const uploadFile = async (file) => {
//         //now here FORMDATA object is IMPORTANT

//         const data = new FormData()///IMPORTANT

//         data.append("file", file)//file and type is IMAGE

//         data.append("upload_preset", "images_preset")//this is for Unsigned upload

//         ///now ACTUAL TASK COMES 
//         //upload image to cloudinary API end point
//         //try to upload

//         try {
//             const cloudName = "dfpophk4b"//not able to ADD ENVIROMNET VARIABLE HERE
//             const resourceType = "image"
//             const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`

//             //now just use fetch or axios to make call
//             // const response = await fetch(api, {
//             //     method: "POST",
//             //     headers: {
//             //         "Content-Type": "application/json"
//             //     },
//             //     body: JSON.stringify({ data })
//             // })
//             const response = await axios.post(api, data)
//             if (response) {
//                 const { secure_url } = response.data
//                 // console.log("url ", secure_url)
//                 return secure_url
//             }
//             //  = response.data//extract url / secure_url 
//         } catch (error) {
//             console.log("error in uploading file to cloudinary at container")
//             console.log(error.message)
//         }
//     }


//     const handleImageUpload = async (event) => {
//         const file = event.target.files[0];
//         // console.log(file)//got the image here


//         //now upload image file to cloudinary and get public URL in return 

//         const fileUrl = await uploadFile(file)

//         // console.log("got url for image", fileUrl)

//         //now send this to backend to store image as message

//         await sendMessage(fileUrl)
//         setShowOptions(false)
//     };



//     return (
//         <div className='md:min-w-[500px] md:max-w-[500px] flex flex-col'>

//             {!selectedConversation ? (<NoChatSelected />) : <>
//                 {/*Header*/}
//                 <div className='bg-slate-500 px-4 py-2 mb-2 flex justify-between relative'>
//                     <div className='bg-slate-500'>
//                         <span className='label-text'>To:</span>
//                         <span className='text-gray-900 font-bold'> {selectedConversation.fullName}</span>
//                         <span className='font-xl'> {getRandEmoji()}</span>
//                     </div>

//                     <div className='relative' ref={dropdownRef}>
//                         <button onClick={() => setShowOptions(!showOptions)} className='focus:outline-none'>
//                             {!showOptions ? (
//                                 <FaEllipsisV className="cursor-pointer hover:text-white" />
//                             ) : (
//                                 <FaTimes className="hover:text-red-500" />
//                             )}

//                         </button>
//                         {showOptions && (
//                             <div className='absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10'>
//                                 <ul className='py-1'>
//                                     <input
//                                         type='file'
//                                         accept='image/*'
//                                         style={{ display: 'none' }}
//                                         ref={fileInputRef}
//                                         onChange={handleImageUpload}
//                                     />
//                                     <li className='flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-black ' onClick={() => fileInputRef.current.click()}>
//                                         <FaImage className='mr-2' /> Image
//                                     </li>
//                                     <li className='flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-black'>
//                                         <FaFile className='mr-2' /> Document
//                                     </li>
//                                     <li className='flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-black'>
//                                         <FaVideo className='mr-2' /> Video Call
//                                     </li>
//                                     <li className='flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-black'>
//                                         <FaPhone className='mr-2' /> Audio Call
//                                     </li>
//                                 </ul>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <Messages />

//                 <MessageInput />
//             </>}
//         </div>
//     )
// }

// const NoChatSelected = () => {

//     const { authUser } = useAuthContext()

//     return (
//         <div className='flex items-center justify-center w-full h-full'>
//             <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>

//                 <p>Welcome👋 {authUser.fullName}🌻</p>
//                 <p>Select a chat to start messaging</p>
//                 <TiMessages className="text-3xl md:text-6xl text-center" />

//             </div>
//         </div >

//     )

// }

// export default MessageContainer





import React, { useEffect, useState, useRef } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from 'react-icons/ti';
import { FaEllipsisV, FaTimes, FaVideo, FaPhone, FaImage, FaFile } from 'react-icons/fa';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/authContext';
import getRandEmoji from "../sidebar/emojis";
import useSendMessage from '../../hooks/useSendMessage';
import VideoCallWindow from './VideoCallWindow';
import axios from 'axios';

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { loading, sendMessage } = useSendMessage();
    const [showOptions, setShowOptions] = useState(false);
    const [showVideoCall, setShowVideoCall] = useState(false);
    const fileInputRef = useRef(null);

    console.log("message container rendered !")
    useEffect(() => {
        return () => {
            setSelectedConversation(null);
            setShowOptions(false);
            setShowVideoCall(false); // Close video call window when component unmounts
        };
    }, [setSelectedConversation]);

    const handleImageUpload = async (event) => {
        
        const file = event.target.files[0];
        const fileUrl = await uploadFile(file);
        await sendMessage(fileUrl);
        
        setShowOptions(false);
    };

    const uploadFile = async (file) => {
        // console.log("indide upload file")
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
        <div className='md:min-w-[500px] md:max-w-[500px] flex flex-col'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    <div className='bg-slate-500 px-4 py-2 mb-2 flex justify-between relative'>
                        <div className='bg-slate-500'>
                            <span className='label-text'>To:</span>
                            <span className='text-gray-900 font-bold'> {selectedConversation.fullName}</span>
                            <span className='font-xl'> {getRandEmoji()}</span>
                        </div>
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
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome👋 {authUser.fullName}🌻</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className="text-3xl md:text-6xl text-center" />
            </div>
        </div>
    );
};


export default MessageContainer;
