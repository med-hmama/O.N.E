const Message = require("../models/messageModel");

const createMessage = async (req, res) => {
  const { senderName, phoneNumber, email, message } = req.body;

  const newMessage = new Message({ senderName, phoneNumber, email, message });

  try {
    await newMessage.save();
    res
      .status(201)
      .json({ message: "Message created successfully", newMessage });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateMessage = async (req, res) => {
  const { senderName, phoneNumber, email, message } = req.body;

  let updatedFields = {
    name,
    city,
    address,
    entrepriseId,
    date,
    description,
  };

  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      updatedFields
    );

    if (updatedMessage) {
      await res.json({
        message: "Message updated successfully",
        updatedMessage,
      });
    } else {
      res.status(404).json("Message not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteMessage = async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message) {
    await Message.deleteOne({ _id: message._id });
    res.json({ message: "Message deleted successfully." });
  } else {
    res.status(404).json("Message not found");
  }
};

// Display functions
const getAllMessages = async (req, res) => {
  const messages = await Message.find({});
  res.status(200).json(messages);
};

const messageInfo = async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message) {
    res.json(message);
  } else {
    res.status(404).json("Message not found.");
  }
};

module.exports = {
  createMessage,
  updateMessage,
  deleteMessage,
  getAllMessages,
  messageInfo,
};
