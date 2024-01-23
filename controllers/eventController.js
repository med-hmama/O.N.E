const Event = require('../models/eventModel');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.createEvent = async (req, res) => {
    const event = new Event({
        name: req.body.name,
        city: req.body.city,
        address: req.body.address,
        entrepriseId: req.body.entrepriseId,
        date: req.body.date,
        description: req.body.description
    });

    try {
        const savedEvent = await event.save();
        res.send({ savedEvent });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.updateEvent = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Event.findByIdAndUpdate(
            { _id: req.params.id }, {
            name: req.body.name,
            city: req.body.city,
            address: req.body.address,
            entrepriseId: req.body.entrepriseId,
            date: req.body.date,
            description: req.body.description
        }
        ).then((docs, err) => {
            if (!err) return res.json({ message: "Succefully updated" });
        });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.deleteEvent = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Event.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Succefully deleted" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



// Display functions

module.exports.getAllEvents = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const events = await Event.find().populate("entrepriseId", "name").sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
    res.status(200).json(events);
};


module.exports.eventInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    Event.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID unknown : ' + err);
    }).populate("entrepriseId", "name");
};