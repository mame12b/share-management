const mongoose = require('mongoose');

const groupchatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const GroupChat = mongoose.model('GroupChat', groupchatSchema);

module.exports = GroupChat;