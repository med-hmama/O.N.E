const Desk = require("../models/deskModel");
const User = require("../models/userModel");

const createDesk = async (req, res) => {
  const { deskNumber, phoneNumber, city, address, postalCode } = req.body;

  const deskNumberExists = await Desk.findOne({ deskNumber });

  if (deskNumberExists)
    return res.status(400).json({ message: "Desk number already exists." });

  const phoneNumberExists = await Desk.findOne({ phoneNumber });

  if (phoneNumberExists)
    return res.status(400).json({ message: "Phone number already exists." });

  const newDesk = new Desk({
    deskNumber,
    phoneNumber,
    city,
    address,
    postalCode,
  });

  try {
    await newDesk.save();
    res.status(201).json({ message: "Desk created successfully", newDesk });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateDesk = async (req, res) => {
  const { deskNumber, phoneNumber, city, address, postalCode } = req.body;

  let updatedFields = {
    deskNumber,
    phoneNumber,
    city,
    address,
    postalCode,
  };

  try {
    const updatedDesk = await Desk.findByIdAndUpdate(
      req.params.id,
      updatedFields
    );

    if (updatedDesk) {
      await res.json({ message: "Desk updated successfully", updatedDesk });
    } else {
      res.status(404).json("Desk not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteDesk = async (req, res) => {
  const desk = await Desk.findById(req.params.id);

  if (desk) {
    await Desk.deleteOne({ _id: desk._id });
    res.json({ message: "Desk deleted successfully." });
  } else {
    res.status(404).json("Desk not found");
  }
};

// Display functions
const getAllDesks = async (req, res) => {
  const desks = await Desk.find({});
  res.status(200).json(desks);
};

const deskInfo = async (req, res) => {
  const desk = await Desk.findById(req.params.id);

  if (desk) {
    res.json(desk);
  } else {
    res.status(404).json("Desk not found.");
  }
};

const getCurrentUserDeskInfo = async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  const desk = await Desk.findById(currentUser.deskId);

  if (desk) {
    res.json(desk);
  } else {
    res.status(404).json("Desk not found.");
  }
};

module.exports = {
  createDesk,
  updateDesk,
  deleteDesk,
  getAllDesks,
  deskInfo,
  getCurrentUserDeskInfo,
};
