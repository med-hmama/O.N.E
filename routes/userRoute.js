const router = require("express").Router();
const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  userInfo,
  loginUser,
  logoutUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} = require("../controllers/userController");

const {
  authenticate,
  authorizedAdmin,
} = require("../middlewares/authMiddleware.js");

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizedAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

router
  .route("/:id")
  .delete(authenticate, authorizedAdmin, deleteUser)
  .get(authenticate, authorizedAdmin, userInfo)
  .put(authenticate, authorizedAdmin, updateUser);

module.exports = router;
