import React from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import useListenMessages from '../../hooks/useListenMessages'
import { useEffect, useRef } from "react";
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/authContext'
const Messages = () => {

	const { loading, messages } = useGetMessages()
	const { selectedConversation } = useConversation()
	const { authUser } = useAuthContext()



	useListenMessages()
	const lastMessageRef = useRef();

	useEffect(() => {

		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 10);
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading && messages.length > 0 && messages?.map((messageContainer) => {

				return (<div key={messageContainer._id} ref={lastMessageRef}>
					<Message messageContainer={messageContainer} />
				</div>)

			})}

			{loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}
			{!loading && messages.length === 0 && <p className='text-center'>Send a message to start conversation</p>}
		</div>
	);

}

export default Messages




