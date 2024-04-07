import { useAuthContext } from '../../context/authContext';
import useDeleteMessage from '../../hooks/useDeleteMessage';
import useConversation from '../../zustand/useConversation';
import { toast } from 'react-hot-toast';
import { memo } from 'react';

const Message = ({ messageContainer }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const { deleteMessage } = useDeleteMessage();

  const fromMe = authUser._id === messageContainer.senderId;
  const chatClass = fromMe ? "chat chat-end" : "chat chat-start";
  const profilePic = fromMe ? authUser.profilePicture : selectedConversation.profilePicture;
  const bubbleColor = fromMe ? "bg-blue-500" : "bg-gray-500";
  const shakeClass = messageContainer.shouldShake ? "shake" : "";

  const formattedTime = (time) => {
    const messageTime = new Date(time);
    return messageTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
  };

  const handleDelete = (messageId) => {
    toast.promise(
      deleteMessage(messageId),
      {
        loading: 'Deleting message...',
        success: 'Message deleted successfully',
        error: (error) => {
          console.error("Error deleting message:", error);
          return 'Error deleting message';
        }
      }
    );
  };

  return (
    <div key={messageContainer._id} className={`${chatClass}`}>
      <div className='chat-image avatar'>
        <div className='w-8 rounded-full'>
          <img
            alt='Bubble chatCompnent'
            src={profilePic}
          />
        </div>
      </div>
      {!messageContainer?.message?.includes('https://res.cloudinary.com/dfpophk4b/image/upload') ? (
        <div
          key={`${messageContainer._id}-bubble`}
          className={`break-words chat-bubble text-white text-md ${bubbleColor} ${shakeClass}`}
          onDoubleClick={() => handleDelete(messageContainer?._id)}
        >
          {messageContainer.message}
        </div>
      ) : (
        <img
          key={`${messageContainer._id}-image`}
          src={messageContainer.message}
          alt='Image'
          className="relative h-40 w-auto border border-gray-400 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105"
        />
      )}
      <div className='chat-footer opacity-100 text-xs flex gap-1 items-center '>{formattedTime(messageContainer.createdAt)}</div>
    </div>
  );
};

export default memo(Message);
