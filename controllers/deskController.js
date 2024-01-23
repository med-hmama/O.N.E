const Desk = require('../models/deskModel');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.createDesk = async (req, res) => {
    const desk = new Desk({
        deskNumber: req.body.deskNumber,
        telephone: req.body.telephone,
        city: req.body.city,
        address: req.body.address,
        postalCode: req.body.postalCode
    });

    try {
        const savedDesk = await desk.save();
        res.send({ savedDesk });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.updateDesk = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Desk.findByIdAndUpdate(
            { _id: req.params.id }, {
            deskNumber: req.body.deskNumber,
            telephone: req.body.telephone,
            city: req.body.city,
            address: req.body.address,
            postalCode: req.body.postalCode
        }
        ).then((docs, err) => {
            if (!err) return res.json({ message: "Succefully updated" });
        });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.deleteDesk = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Desk.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Succefully deleted" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



// Display functions

module.exports.getAllDesks = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const desks = await Desk.find().limit(limit * 1).skip((page - 1) * limit);
    res.status(200).json(desks);
};


module.exports.deskInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    Desk.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID unknown : ' + err);
    });
};