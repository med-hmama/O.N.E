const Entreprise = require("../models/entrepriseModel");
const User = require("../models/userModel");

const createEntreprise = async (req, res) => {
  const {
    name,
    commercialName,
    image,
    telephone,
    fax,
    webSite,
    city,
    address,
    type,
    category,
    subCategory,
    description,
  } = req.body;

  const newEntreprise = new Entreprise({
    name,
    commercialName,
    image,
    telephone,
    fax,
    webSite,
    city,
    address,
    type,
    category,
    subCategory,
    description,
  });

  try {
    await newEntreprise.save();
    res
      .status(201)
      .json({ message: "Entreprise created successfully", newEntreprise });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateEntreprise = async (req, res) => {
  const {
    name,
    commercialName,
    image,
    telephone,
    fax,
    webSite,
    city,
    address,
    type,
    category,
    subCategory,
    description,
  } = req.body;

  let updatedFields = {
    name,
    commercialName,
    image,
    telephone,
    fax,
    webSite,
    city,
    address,
    type,
    category,
    subCategory,
    description,
  };

  try {
    const updatedEntreprise = await Entreprise.findByIdAndUpdate(
      req.params.id,
      updatedFields
    );

    if (updatedEntreprise) {
      await res.json({
        message: "Entreprise updated successfully",
        updatedEntreprise,
      });
    } else {
      res.status(404).json("Entreprise not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteEntreprise = async (req, res) => {
  const entreprise = await Entreprise.findById(req.params.id);

  if (entreprise) {
    await entreprise.deleteOne({ _id: entreprise._id });
    res.json({ message: "Entreprise deleted successfully." });
  } else {
    res.status(404).json("Entreprise not found");
  }
};

// Display functions
const getAllEntreprises = async (req, res) => {
  const entreprises = await Entreprise.find({});
  res.status(200).json(entreprises);
};

const entrepriseInfo = async (req, res) => {
  const entreprise = await Entreprise.findById(req.params.id);

  if (entreprise) {
    res.json(entreprise);
  } else {
    res.status(404).json("Entreprise not found.");
  }
};

const getCurrentUserEntrepriseInfo = async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  const entreprise = await Entreprise.findById(currentUser.entrepriseId);

  if (entreprise) {
    res.json(entreprise);
  } else {
    res.status(404).json("Entreprise not found.");
  }
};

module.exports = {
  createEntreprise,
  updateEntreprise,
  deleteEntreprise,
  entrepriseInfo,
  getAllEntreprises,
  getCurrentUserEntrepriseInfo,
};
