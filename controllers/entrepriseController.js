const Entreprise = require('../models/entrepriseModel');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.createEntreprise = async (req, res) => {
    const entreprise = new Entreprise({
        name: req.body.name,
        commercialName: req.body.commercialName,
        image: req.body.image,
        telephone: req.body.telephone,
        fax: req.body.fax,
        webSite: req.body.webSite,
        city: req.body.city,
        address: req.body.address,
        type: req.body.type,
        category: req.body.category,
        subCategory: req.body.subCategory,
        description: req.body.description
    });

    try {
        const savedEntreprise = await entreprise.save();
        return res.status(201).send({ savedEntreprise });

    } catch (err) {
        return res.status(400).send(err);
    }
};



module.exports.updateEntreprise = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Entreprise.findByIdAndUpdate(
            { _id: req.params.id }, {
            name: req.body.name,
            commercialName: req.body.commercialName,
            image: req.body.image,
            telephone: req.body.telephone,
            fax: req.body.fax,
            webSite: req.body.webSite,
            city: req.body.city,
            address: req.body.address,
            type: req.body.type,
            category: req.body.category,
            subCategory: req.body.subCategory,
            description: req.body.description
        }
        ).then((docs, err) => {
            if (!err) return res.json({ message: "Succefully updated" });
        })

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.deleteEntreprise = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Entreprise.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Succefully deleted" })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
};



// Display functions

module.exports.getAllEntreprises = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const entreprises = await Entreprise.find().limit(limit * 1).skip((page - 1) * limit);
    res.status(200).json(entreprises);
};



module.exports.entrepriseInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    Entreprise.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID unknown : ' + err)
    })
};