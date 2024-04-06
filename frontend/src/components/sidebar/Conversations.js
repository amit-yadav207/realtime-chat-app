// import React from 'react';
// import Conversation from './Conversation';
// import useGetConversations from '../../hooks/useGetConversations';
// import getRandEmoji from './emojis';

// const Conversations = () => {
//     const { loading, conversations } = useGetConversations();

//     return (
//         <div className='py-2 flex flex-col overflow-auto'>
//             {conversations.length > 0 ? (
//                 conversations.map((conversation, index) => (
//                     <Conversation
//                         key={conversation._id}
//                         conversation={conversation}
//                         emoji={getRandEmoji()}
//                         lastIndex={index === conversations.length - 1}
//                     />
//                 ))
//             ) : (
//                 <div className='flex-grow'>
//                     <p>No conversations yet</p>
//                 </div>
//             )}

//             {loading ? <span className='loading loading-spinner align-middle'></span> : null}
//         </div>
//     );
// };

// export default Conversations;


import useGetConversations from "../../hooks/useGetConversations";
import getRandEmoji from './emojis';
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	console.log("conversations in sidebar rendred")
	return (
		<div className='py-2 flex flex-col overflow-auto'>
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
