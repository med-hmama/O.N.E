const router = require('express').Router();
const paymentController = require('../controllers/paymentController');

router.post('/cash',paymentController.payCash);
router.post('/check',paymentController.payCheck);
router.delete('/:id',paymentController.deletePayment);
router.put('/cash/:id',paymentController.updatePayCash);
router.put('/check/:id',paymentController.updatePayCheck);
router.get('/' ,paymentController.getAllPayments);
router.get('/cash' ,paymentController.getAllCashPayments);
router.get('/check' ,paymentController.getAllCheckPayments);
router.get('/:id', paymentController.paymentInfo);

module.exports = router;