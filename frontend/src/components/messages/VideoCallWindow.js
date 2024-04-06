import React, { useCallback, useState, useRef, useEffect } from 'react';
import { FaTimes, FaPhoneSlash, FaPhone } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { useSocketContext } from '../../context/socketContext';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/authContext';
import peer from '../../services/peer'

const VideoCallWindow = ({ onClose }) => {

    const { authUser } = useAuthContext()
    const { socket } = useSocketContext()
    const [stream, setStream] = useState(null);
    const playerRef = useRef(null);
    const { selectedConversation } = useConversation()
    const [remoteSocketId, setRemoteSocketId] = useState(selectedConversation._id)


    // const handleCall = () => {
    //     setRemoteSocketId(selectedConversation._id)
    //     const offer = await.peer.getOffer()
    //     socket?.emit('user:call', { to: remoteSocketId, offer })
    //     // socket?.emit('call:accept', { frame: "1" })

    // }

    const handleCall = useCallback(async () => {


        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setStream(mediaStream);
            ////i have turend on my stream 

            //now send offer to remoteuser

            setRemoteSocketId(selectedConversation._id)
            const offer = await peer.getOffer()
            socket?.emit('user:call', { to: selectedConversation._id, offer })


        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    }, [socket, selectedConversation._id]);

    const handleDisconnect = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            // onClose()
        }
    }, [stream]);




    // const handleIncomingCall = useCallback((data) => {
    //     // console.log("incoming call", from, offer)
    //     console.log(data)
    // }, [])

    useEffect(() => {
        const handleIncomingCall = (data) => {
            console.log("Incoming call:", data);
            // Handle the incoming call here
        };

        if (socket) {
            socket.on("incoming:call", handleIncomingCall);
        }

        return () => {
            if (socket) {
                socket.off("incoming:call", handleIncomingCall);
            }
        };
    }, [socket]);


    useEffect(() => {
        socket.on("hello", (data) => {
            console.log(data)
        })

    }, [socket])


    // useEffect(() => {

    // }, [])
    return (
        <div className="absolute flex top-0 left-0 w-3/5 h-4/5 bg-white border border-gray-200 rounded-lg shadow-md z-20">
            {stream && (
                <div className='absolute top-10 left-9 w-100 h-60'>
                    <ReactPlayer
                        ref={playerRef}
                        playing
                        url={stream}
                        width='95%'
                        height='100%'
                        muted={false}
                    />
                </div>
            )}

            <button title='close tab' onClick={onClose} className="absolute top-0 right-0 m-2 text-gray-600">
                <FaTimes />
            </button>
            <div className="absolute bottom-0 w-full text-center">
                {stream ?
                    <button title="End Call" className="m-2 text-gray-600 px-8 py-2 rounded shadow-md bg-red-600" onClick={handleDisconnect}>
                        <FaPhoneSlash className='text-white text-xl' />
                    </button>
                    :
                    <button title="Start Call" className="m-2 text-gray-600 px-8 py-2 rounded shadow-md bg-green-600" onClick={handleCall}>
                        <FaPhone className='text-white text-xl' />
                    </button>
                }
            </div>
        </div>
    );
};

export default VideoCallWindow;
