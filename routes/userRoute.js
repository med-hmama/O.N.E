const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/adherent' ,userController.createUserAdherant);
router.post('/admin' ,userController.createUserAdmin);
router.put('/:id', userController.updateUser);
router.delete('/:id',userController.deleteUser);
router.get('/adherents', userController.getAdherent);
router.get('/admins', userController.getAdmin);
router.get('/:id', userController.userInfo);
router.get('/' ,userController.getAllUsers);

module.exports = router;