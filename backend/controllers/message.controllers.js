
// import Conversation from "../models/conversation.model.js"
// import Message from "../models/message.model.js"
// import { getReceiverSocketId,io } from "../socket/socket.js"



// export const sendMessage = async (req, res) => {
//     try {
//         const { message } = req.body
//         const { id: receiverId } = req.params//receiver id
//         //verify sender is logged in using middleware 
//         //middleware will add a userId in res paramter and we can access that res.usrID as senderID
//         //use midlleware protectRoute
//         const senderId = req.user._id//set using middleware

//         // console.log("sender id ", senderId)
//         //now check if gven sender and receiver has already some conversation or not
//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] }
//         })

//         if (!conversation) {//if no conversation then Create A new  Conversation 
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId]
//                 //by default messages array is empty here 
//             })
//         }

//         //now there is a conversation and we can add the id of message of messages array 
//         //first store this message in message collection

//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             message
//         })

//         if (newMessage) {
//             conversation.messages.push(newMessage._id)
//         }

//         //save both collections 
//         //we can optimise these promises execution by using Promis.all([])
//         // await newMessage.save()
//         // await conversation.save()
//         //this will run in parallel




//         await Promise.all([newMessage.save(), conversation.save()])

//         //*****SOCKET IO functionality here for REAl time Updating messages

//         const receiverSocketId = getReceiverSocketId(receiverId)
//         if (receiverSocketId) {
//             //send event to a specific client
//             console.log("receiver sockt id",receiverSocketId)
//             console.log("receiver id",receiverId)

//             // io.to(receiverSocketId.emit("newMessage", newMessage))
//             io.to(receiverSocketId).emit("newMessage", newMessage);
//             console.log("new mesage sent:", newMessage)

//         }

//         res.status(201).json(newMessage)


//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }



// export const getMessages = async (req, res) => {
//     try {
//         const { id: userToChatId } = req.params;
//         const senderId = req.user._id;

//         // Find conversation between the two users
//         const conversation = await Conversation.findOne({
//             participants: { $all: [senderId, userToChatId] }
//         }).populate('messages');

//         if (!conversation) {
//             // If no conversation found, return empty array
//             return res.status(200).json([]);
//         }

//         // Extract actual messages from the conversation
//         // console.log("conv ", conversation.messages)
//         // const messages = conversation.messages.map((message)=>message.message)
//         const messages = conversation.messages   //it is [ ] of Message model which
//         //contains senderId rID message created At

//         res.status(200).json(messages);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// export const sendMessage = async (req, res) => {
//     try {
//         const { message } = req.body;
//         const { id: receiverId } = req.params; // Receiver id
//         const senderId = req.user._id; // Sender id

//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] }
//         });

//         if (!conversation) {
//             // Create a new conversation if none exists
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId]
//             });
//         }

//         // Create a new message
//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             message
//         });

//         // Add the message ID to the conversation
//         conversation.messages.push(newMessage._id);

//         // Save the message and conversation
//         await Promise.all([newMessage.save(), conversation.save()]);

//         // Emit the new message event to the receiver if available
//         const receiverSocketId = getReceiverSocketId(receiverId);
//         if (receiverSocketId) {
//             io.to(receiverSocketId).emit("newMessage", newMessage);
//         }

//         res.status(201).json(newMessage);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const getMessages = async (req, res) => {
//     try {
//         const { id: userToChatId } = req.params;
//         const senderId = req.user._id;

//         const conversation = await Conversation.findOne({
//             participants: { $all: [senderId, userToChatId] }
//         }).populate('messages');

//         if (!conversation) {
//             return res.status(200).json([]);
//         }

//         const messages = conversation.messages;
//         res.status(200).json(messages);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };












import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;



		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// await conversation.save();
		// await newMessage.save();

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;
		// console.log("msgs, ", messages)
		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};






export const deleteMessage = async (req, res) => {
	try {
		const { messageId } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		// Find the conversation
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			return res.status(404).json({ error: 'Conversation not found' });
		}

		// Remove the messageId from conversation.messages array
		const index = conversation.messages.indexOf(messageId);
		if (index !== -1) {
			conversation.messages.splice(index, 1);
		}

		// Delete the message
		await Message.findByIdAndDelete(messageId);

		// Save the conversation after updating
		await conversation.save();

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		//   const receiverSocketId = getReceiverSocketId(receiverId);
		//   if (receiverSocketId) {
		// 	io.to(receiverSocketId).emit('messageDeleted', { messageId });
		//   }

		// Respond with updated messages
		//   console.log(messages)
		const messages = conversation;////ERRORRRRR WHAT YOU RETURN ????????
		console.log(messages)
		res.status(200).json(messages);
	} catch (error) {
		console.error('Error in deleteMessage controller:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};
