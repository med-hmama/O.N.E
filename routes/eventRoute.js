const router = require('express').Router();
const eventController = require('../controllers/eventController');

router.post('/',eventController.createEvent);
router.delete('/:id', eventController.deleteEvent);
router.put('/:id', eventController.updateEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.eventInfo);


module.exports = router;