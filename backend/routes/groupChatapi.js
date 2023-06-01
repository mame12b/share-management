const express = require('express');
const router = express.Router();
const groupChatController = require('../controllers/groupChatController');
//const auth = require('../middleware/auth');

router.post('/',  groupChatController.createChat);
router.get('/:groupId',  groupChatController.getChatsByGroup);

module.exports = router;
//auth