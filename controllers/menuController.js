const Menu = require("../models/menu");

const createMenuItem = async (req, res) => {
  try {
    const newMenu = new Menu(req.body);
    const response = await newMenu.save();

    console.log("Data saved");
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getMenuByTaste = async (req, res) => {
  try {
    const menuTaste = req.params.taste;
    if (["sour", "salty", "sweet"].includes(menuTaste)) {
      const response = await Menu.find({ taste: menuTaste });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMenu = async (req, res) => {
  try {
    const menuData = await Menu.findOne();
    res.status(200).send(menuData);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const updateMenuItem = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).send({error:"Internal Server Error"})
    }
};

const deleteMenuItem = async(req, res, next) => {
    try {
        
    } catch (error) {
        res.status(500).send({error:"Internal Server Error"})
    }
};

module.exports = {
  createMenuItem,
  getMenuByTaste,
  getMenu,
  updateMenuItem,
  deleteMenuItem
};
