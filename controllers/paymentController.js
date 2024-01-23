const Payment = require('../models/paymentModel');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.payCash = async (req, res) => {
    const payment = new Payment({
        entreprise: req.body.entreprise,
        method: "espèce",
        duration: req.body.duration,
        paymentDate: req.body.paymentDate,
        amount: req.body.amount
    });

    try {
        const savedPayment = await payment.save();
        res.send({ savedPayment });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



module.exports.payCheck = async (req, res) => {
    const payment = new Payment({
        entreprise: req.body.entreprise,
        method: "Chéque",
        duration: req.body.duration,
        amount: req.body.amount,
        checkNumber: req.body.checkNumber,
        checkDate: req.body.checkDate
    });

    try {
        const savedPayment = await payment.save();
        res.send({ savedPayment });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.deletePayment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Payment.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Succefully deleted" });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.updatePayCash = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Payment.findByIdAndUpdate(
            { _id: req.params.id }, {
            entreprise: req.body.entreprise,
            method: req.body.method,
            duration: req.body.duration,
            amount: req.body.amount,
            paymentDate: req.body.Date
        },
        ).then((docs, err) => {
            if (!err) return res.json({ message: "Succefully updated" });

        });

    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.updatePayCheck = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Payment.findByIdAndUpdate(
            { _id: req.params.id }, {
            entreprise: req.body.entreprise,
            method: req.body.method,
            duration: req.body.duration,
            amount: req.body.amount,
            paymentDate: req.body.Date,
            checkNumber: req.body.checkNumber,
            checkDate: req.body.checkDate
        },
        ).then((docs, err) => {
            if (!err) return res.json({ message: "Succefully updated" });

        })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};



// Display functions

module.exports.getAllPayments = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const payments = await Payment.find().populate("entreprise", "name").sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
    res.status(200).json(payments)
};


module.exports.getAllCashPayments = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const payments = await Payment.find({ method: "espèce" }).populate("entreprise", "name").sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
    res.status(200).json(payments)
};


module.exports.getAllCheckPayments = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const payments = await Payment.find({ method: "Chéque" }).populate("entreprise", "name").sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
    res.status(200).json(payments)
};



module.exports.paymentInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    Payment.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID unknown : ' + err)
    }).populate("entreprise", "name");
};