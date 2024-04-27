const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/createToken");

const createUser = async (req, res) => {
  const {
    username,
    password,
    email,
    firstName,
    lastName,
    phoneNumber,
    isAdmin,
    entrepriseId,
    deskId,
  } = req.body;

  const usernameExists = await User.findOne({ username });
  if (usernameExists)
    return res.status(400).json({ message: "This username  already exists." });

  const emailExists = await User.findOne({ email });
  if (emailExists)
    return res.status(400).json({ message: "This email already exists." });

  const phoneNumberExists = await User.findOne({ phoneNumber });
  if (phoneNumberExists)
    return res
      .status(400)
      .json({ message: "This phone number already exists." });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    firstName,
    lastName,
    phoneNumber,
    isAdmin,
    entrepriseId,
    deskId,
  });

  try {
    await newUser.save();
    res.send({ newUser });
    generateToken(res, newUser._id);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user.isAdmin) {
    res.status(400).json("Cannot update admin user.");
  } else {
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      phoneNumber,
      entrepriseId,
      deskId,
    } = req.body;

    let updatedFields = {
      username,
      email,
      firstName,
      lastName,
      phoneNumber,
      entrepriseId,
      deskId,
    };

    if (password) {
      const saltRounds = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updatedFields.password = hashedPassword;
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        updatedFields
      );

      if (updatedUser) {
        await res.json({
          message: "User updated succsessfully",
          updateUser,
        });
      } else {
        res.status(404).json("User not found");
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400).json("Cannot delete an admin user.");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User deleted successfully." });
  } else {
    res.status(404).json("User not found");
  }
};

const getCurrentUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json("User not found.");
  }
};

const updateCurrentUserProfile = async (req, res) => {
  const { password, firstName, lastName, address } = req.body;

  let updatedFields = {
    firstName,
    lastName,
    address,
  };

  if (password) {
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    updatedFields.password = hashedPassword;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updatedFields
    );

    if (updatedUser) {
      await res.json({
        updatedUser,
      });
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// DISPLAY FUNCTIONS
const getAllUsers = async (req, res) => {
  const users = await User.find()
    .populate({ path: "entrepriseId", select: ["name", "image"] })
    .populate("deskId", "deskNumber");
  res.status(200).json(users);
};

const userInfo = async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("entrepriseId", "name")
    .populate("deskId", "deskNumber");

  if (user) {
    res.json({ user });
  } else {
    res.status(404).json("User not found.");
  }
};

//AUTH FUNCTIONS
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (!existingUser)
    return res.status(400).json({ message: "Invalid credentials" });

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid)
    return res.status(400).json({ message: "Invalid credentials" });

  generateToken(res, existingUser._id);

  return res.status(201).json({
    message: "Logged in successfully.",
    existingUser,
  });
};

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  userInfo,
  loginUser,
  logoutUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
};
