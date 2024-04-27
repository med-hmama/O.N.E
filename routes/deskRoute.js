const router = require("express").Router();
const {
  createDesk,
  updateDesk,
  deleteDesk,
  getAllDesks,
  deskInfo,
  getCurrentUserDeskInfo,
} = require("../controllers/deskController");

const { authorizedAdmin } = require("../middlewares/authMiddleware");

router
  .route("/")
  .post(authorizedAdmin, createDesk)
  .get(authorizedAdmin, getAllDesks);

router.get("/current", getCurrentUserDeskInfo);

router
  .route("/:id")
  .delete(authorizedAdmin, deleteDesk)
  .put(authorizedAdmin, updateDesk)
  .get(authorizedAdmin, deskInfo);

module.exports = router;
