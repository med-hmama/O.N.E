const router = require('express').Router();
const deskController = require('../controllers/deskController');

router.post('/',deskController.createDesk);
router.delete('/:id', deskController.deleteDesk);
router.put('/:id', deskController.updateDesk);
router.get('/', deskController.getAllDesks);
router.get('/:id', deskController.deskInfo);

module.exports = router;  