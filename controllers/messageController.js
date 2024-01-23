const Message = require('../models/messageModel');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.createMessage = async (req, res) => {
    const message = new Message({
        senderName: req.body.senderName,
        telephone: req.body.telephone,
        email: req.body.email,
        message: req.body.message
    });

    try {
        const savedMessage = await message.save();
        res.send({ savedMessage });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.updateMessage = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Message.findByIdAndUpdate(
            { _id: req.params.id }, {
            senderName: req.body.senderName,
            telephone: req.body.telephone,
            email: req.body.email,
            message: req.body.message
        }
        ).then((docs, err) => {
            if (!err) return res.json({ message: "Succefully updated" });
        });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.deleteMessage = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Message.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Succefully deleted" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



// Display functions

module.exports.getAllMessages = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const messages = await Message.find().limit(limit * 1).skip((page - 1) * limit);
    res.status(200).json(messages);
};


module.exports.messageInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    Message.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID unknown : ' + err);
    });
};