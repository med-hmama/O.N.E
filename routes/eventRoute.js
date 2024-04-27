const router = require("express").Router();
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  eventInfo,
} = require("../controllers/eventController");
const { authorizedAdmin } = require("../middlewares/authMiddleware");

router.route("/").post(authorizedAdmin, createEvent).get(getAllEvents);

router
  .route("/:id")
  .delete(authorizedAdmin, deleteEvent)
  .put(authorizedAdmin, updateEvent)
  .get(eventInfo);

module.exports = router;
