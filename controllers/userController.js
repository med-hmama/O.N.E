const User = require('../models/userModel');
const ObjectID = require('mongoose').Types.ObjectId;
const bcrypt = require("bcryptjs");


module.exports.createUserAdherant = async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const adherent = new User({
        pseudo: req.body.pseudo,
        password: hashedPassword,
        email: req.body.email,
        firstName: req.body.firstName,
        name: req.body.name,
        role: "adherent",
        telephone: req.body.telephone,
        entrepriseId: req.body.entrepriseId,
        deskId: req.body.deskId,
        activation: req.body.activation
    });

    try {
        const savedAdherent = await adherent.save();
        res.send({ savedAdherent });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.createUserAdmin = async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const admin = new User({
        pseudo: req.body.pseudo,
        password: hashedPassword,
        email: req.body.email,
        firstName: req.body.firstName,
        name: req.body.name,
        role: "admin",
        telephone: req.body.telephone,
        entrepriseId: req.body.entrepriseId,
        deskId: req.body.deskId,
        activation: req.body.activation
    });

    try {
        const savedAdmin = await admin.save();
        res.send({ savedAdmin });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    try {
        await User.findByIdAndUpdate(
            { _id: req.params.id }, {
            pseudo: req.body.pseudo,
            password: hashedPassword,
            email: req.body.email,
            firstName: req.body.firstName,
            name: req.body.name,
            role: req.body.role,
            telephone: req.body.telephone,
            entrepriseId: req.body.entrepriseId,
            deskId: req.body.deskId,
            activation: req.body.activation
        }
        ).then((docs, err) => {
            if (!err) return res.json({ message: "Succefully updated" });
        })

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};


module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await User.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Succefully deleted" });
    } catch (err) {
        return res.status(500).json({ message: err })
    }
};



// Display functions

module.exports.getAllUsers = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const users = await User.find().populate({ path: 'entrepriseId', select: ['name', 'image'] }).populate("deskId", "deskNumber").limit(limit * 1).skip((page - 1) * limit);
    res.status(200).json(users);
};


module.exports.getAdherent = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const adherents = await User.find({ role: "adherent" }).populate("entrepriseId", "name").populate("deskId", "deskNumber").limit(limit * 1).skip((page - 1) * limit);
    res.status(200).json(adherents);
};

module.exports.getAdmin = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const admins = await User.find({ role: { $regex: 'ADM' } }).populate("entrepriseId", "name").populate("deskId", "deskNumber").limit(limit * 1).skip((page - 1) * limit);
    res.status(200).json(admins);
};


module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    User.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID unknown : ' + err)
    }).populate("entrepriseId", "name").populate("deskId", "deskNumber");
};