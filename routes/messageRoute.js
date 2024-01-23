const router = require('express').Router();
const messageController = require('../controllers/messageController');

router.post('/', messageController.createMessage);
router.put('/:id', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);
router.get('/', messageController.getAllMessages);
router.get('/:id', messageController.messageInfo);

module.exports = router;
