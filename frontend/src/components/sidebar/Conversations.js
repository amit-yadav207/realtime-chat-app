
import useGetConversations from "../../hooks/useGetConversations";
import getRandEmoji from './emojis';
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	// console.log("conversations in sidebar rendred")
	return (
		<div className='py-4 flex flex-col overflow-y-auto md:max-h-screen max-h-60'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;
