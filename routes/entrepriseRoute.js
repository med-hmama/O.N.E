const router = require('express').Router();
const entrepriseController = require('../controllers/entrepriseController');

router.get('/', entrepriseController.getAllEntreprises);
router.post('/', entrepriseController.createEntreprise)
router.put('/:id', entrepriseController.updateEntreprise);
router.delete('/:id', entrepriseController.deleteEntreprise);
router.get('/:id', entrepriseController.entrepriseInfo);

module.exports = router;