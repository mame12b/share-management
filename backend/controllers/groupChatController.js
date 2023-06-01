const GroupChat = require('../model/groupChat');

exports.createChat = async (req, res) => {
  try {
    const { message, groupId } = req.body;
    const chat = new GroupChat({
      sender: req.shareholder._id,
      message,
      groupId
    });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getChatsByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const chats = await GroupChat.find({ groupId }).populate('sender');
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};