const express = require("express");
const router = express.Router();
const MenuController = require("../controllers/menuController");

router.post("/", MenuController.createMenuItem);

router.get("/:taste", MenuController.getMenuByTaste);

router.get("/", MenuController.getMenu);

router.put("/:id",MenuController.updateMenuItem);

router.delete("/:id",MenuController.deleteMenuItem);

module.exports = router;
