const { result } = require("lodash");
const Person = require("../models/person");

const { jwtAuthMiddleware, generateToken } = require("../middlewares/jwt");

const loginPerson = async (req, res) => {
  try {
    //Extract username and passwrd from body
    const { username, password } = req.body;

    // Find the user by username
    const user = await Person.findOne({ username: username });

    // If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    // generate Token
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);

    // return Token as response
    res.json({ token });
  } catch (error) {
    res.status(500), json({ message: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData, "user info");
    const user = userData.id;
    const userProfile = await Person.findById(user);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500), json({ message: "Internal server error" });
  }
};

const createPerson = async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const response = await newPerson.save();

    console.log("Data saved");
    const payload = {
      id: response.id,
      username: response.username,
    };
    const token = generateToken(payload);
    console.log(token, "Token saved");
    res.status(200).send({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getPersonsByWorkType = async (req, res) => {
  try {
    const workType = req.params.workType;
    if (["chef", "manager", "waiter"].includes(workType)) {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPerson = async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const updatePerson = async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter
    const updatedPersonData = req.body; // Updated data for the person

    // Validate personId is a valid MongoDB ObjectId
    if (!personId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({ error: "Invalid person ID" });
    }

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Return true if the person has been updated
        runValidators: true, // Run Mongoose validators
      }
    );

    if (!response) {
      return res.status(404).send({ error: "Person not found" });
    }
    console.log("data Updated");
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const deletePerson = async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter
    const updatedPersonData = req.body; // Updated data for the person

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).send({ error: "Person not found" });
    }
    console.log("data Updated");
    res.status(200).json("Person Deleted Successfully");
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  loginPerson,
  createPerson,
  getPersonsByWorkType,
  getPerson,
  getProfile,
  updatePerson,
  deletePerson,
};
