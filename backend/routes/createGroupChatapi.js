const express = require('express');
const router = express.Router();
const groupChatController = require('../controllers/groupChatController');
//const auth = require('../middleware/auth');

router.post('/chats',  groupChatController.createChat);
router.get('/chats/:groupId',  groupChatController.getChatsByGroup);

module.exports = router;