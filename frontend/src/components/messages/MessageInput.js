// import { useState } from 'react'
// import { BsSend } from "react-icons/bs"
// import useSendMessage from '../../hooks/useSendMessage'
// const MessageInput = () => {

// 	const [message, setMessage] = useState("")
// 	const { loading, sendMessage } = useSendMessage()
// 	const handleSubmit = async (e) => {
// 		e.preventDefault()
// 		if (!message) return

// 		await sendMessage(message)
// 		setMessage("")

// 	}

// 	return (
// 		<form className='px-4 my-3' onSubmit={handleSubmit}>
// 			<div className='w-full relative'>
// 				<input autoFocus type='text' className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white' placeholder='Send a message' value={message} onChange={(e) => setMessage(e.target.value)} />

// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3' onClick={handleSubmit}>
// 					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
// 				</button>
// 			</div>
// 		</form>
// 	)

// }

// export default MessageInput








import { useState } from 'react'
import { BsSend } from "react-icons/bs"
import { FaSmile, FaTimes, FaBars } from 'react-icons/fa';
import useSendMessage from '../../hooks/useSendMessage'
import Picker from 'emoji-picker-react';
const MessageInput = () => {

	const [message, setMessage] = useState("")
	const { loading, sendMessage } = useSendMessage()
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const handleEmojiClick = (event, emojiObject) => {
		setMessage(message + emojiObject.emoji)
		// setShowEmojiPicker(false)
	};
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!message) return

		await sendMessage(message)

		setMessage("")
		setShowEmojiPicker(false)

	}



	return (
		<form className='px-2 my-3' onSubmit={handleSubmit}>
			<div className='relative'>
				{showEmojiPicker && (
					<div className='absolute bottom-full left-0 mt-2'>
						<Picker
							onEmojiClick={(emojiObject, event) => {
								handleEmojiClick(event, emojiObject);
								// setShowEmojiPicker(false); 
							}}
							height={300}
							width={300}
						/>
					</div>
				)}

				<button
					type='button'
					className='absolute inset-y-0 left-0 flex items-center px-2 w-8'
					onClick={() => setShowEmojiPicker(!showEmojiPicker)}
				>
					{!showEmojiPicker ? (
						<FaSmile className="text-gold hover:text-yellow-500" />
					) : (
						<FaTimes className="hover:text-red-500" />
					)}

				</button>

				<input
					autoFocus
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5 pl-10 pr-10 bg-gray-700 border-gray-600 text-white' // Adjusted padding-left to accommodate the emoji button
					placeholder='Send a message...'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onFocus={() => setShowEmojiPicker(false)}
				/>

				<button
					type='submit'
					className='absolute inset-y-0 end-0 flex items-center pr-3'
					onClick={handleSubmit}
				>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend className="hover:text-green-500"/>
					}
				</button>
			</div>
		</form>)

}

export default MessageInput










