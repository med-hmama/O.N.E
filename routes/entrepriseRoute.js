const router = require("express").Router();
const {
  createEntreprise,
  updateEntreprise,
  deleteEntreprise,
  entrepriseInfo,
  getAllEntreprises,
  getCurrentUserEntrepriseInfo,
} = require("../controllers/entrepriseController");

const { authorizedAdmin } = require("../middlewares//authMiddleware");

router
  .route("/")
  .post(authorizedAdmin, createEntreprise)
  .get(authorizedAdmin, getAllEntreprises);

router.get("/current", getCurrentUserEntrepriseInfo);

router
  .route("/:id")
  .put(authorizedAdmin, updateEntreprise)
  .delete(authorizedAdmin, deleteEntreprise)
  .get(authorizedAdmin, entrepriseInfo);

module.exports = router;
