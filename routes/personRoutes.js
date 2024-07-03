const express = require("express");
const router = express.Router();
const PersonController = require("../controllers/personController");
const { jwtAuthMiddleware } = require("../middlewares/jwt");

router.post("/signup", PersonController.createPerson);
router.post("/login", PersonController.loginPerson);
router.get("/profile", jwtAuthMiddleware, PersonController.getProfile);
router.get("/", jwtAuthMiddleware, PersonController.getPerson);
router.get("/:workType", PersonController.getPersonsByWorkType);
router.put("/:id", PersonController.updatePerson);
router.delete("/:id", PersonController.deletePerson);

module.exports = router;
