
import { useAuthContext } from '../../context/authContext';
import useDeleteMessage from '../../hooks/useDeleteMessage';
import useConversation from '../../zustand/useConversation';
import { memo } from 'react';
const Message = ({ messageContainer }) => {

	const { authUser } = useAuthContext()
	const { selectedConversation } = useConversation()
	const { deleteMessage } = useDeleteMessage()



	const fromMe = authUser._id === messageContainer.senderId
	const chatClass = fromMe ? "chat chat-end" : "chat chat-start"
	const profilePic = fromMe ? authUser.profilePicture : selectedConversation.profilePicture
	const bubbleColor = fromMe ? "bg-blue-500" : "bg-gray-500"

	const shakeClass = messageContainer.shouldShake ? "shake" : "";



	const formattedTime = (time) => {
		const messageTime = new Date(time); // Convert the timestamp to a Date object
		return messageTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
		// Format to display only hours and minutes
	}

	const handleDelete = async (messageId) => {
		console.log(messageId)
		await deleteMessage(messageId)
	}


	console.log("selected conversation renderd",selectedConversation._id)
	// console.log("sender + auth : ", messageContainer.senderId,authUser._id)

	// if (selectedConversation._id !== messageContainer.receiverId)
	// 	return;
	return (
		<div className={`${chatClass}`} >
			<div className='chat-image avatar'>
				<div className='w-8 rounded-full'>
					<img
						alt='Bubble chatCompnent'
						src={profilePic}
					/>
				</div>
			</div>
			{!messageContainer.message.includes('https://res.cloudinary.com/dfpophk4b/image/upload') ? (
				<div
					className={`break-words chat-bubble text-white ${bubbleColor} ${shakeClass} pb-2`}
					onDoubleClick={() => handleDelete(messageContainer._id)}

				>
					{messageContainer.message}
				</div>
			) : (

				<img
					src={messageContainer.message}
					alt='Image'
					className="relative h-40 w-auto border border-gray-400 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105"
				/>

			)}

			<div className='chat-footer opacity-100 text-xs flex gap-1 items-center'>{formattedTime(messageContainer.createdAt)}</div>
		</div >
	)
}

export default memo(Message)



