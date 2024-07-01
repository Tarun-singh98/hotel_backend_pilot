const express = require("express");
const router = express.Router();
const PersonController = require("../controllers/personController");

router.post("/", PersonController.createPerson);

router.get("/:workType", PersonController.getPersonsByWorkType);

router.get("/", PersonController.getPerson);

router.put("/:id",PersonController.updatePerson);

router.delete("/:id",PersonController.deletePerson);

module.exports = router;
