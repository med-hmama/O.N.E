const router = require("express").Router();
const {
  payCheck,
  payCash,
  updatePayCheck,
  updatePayCash,
  deletePayment,
  getAllPayments,
  getAllCashPayments,
  getAllCheckPayments,
  paymentInfo,
} = require("../controllers/paymentController");

router.get("/", getAllPayments);

router.route("/cash").post(payCash).get(getAllCashPayments);
router.put("/cash/:id", updatePayCash);

router.route("/check").post(payCheck).get(getAllCheckPayments);
router.put("/check/:id", updatePayCheck);

router.route("/:id").delete(deletePayment).get(paymentInfo);

module.exports = router;
