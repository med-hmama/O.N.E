const Payment = require("../models/paymentModel");

const payCash = async (req, res) => {
  const { entreprise, duration, paymentDate, amount } = req.body;

  const payment = new Payment({
    entreprise,
    method: "cash",
    duration,
    paymentDate,
    amount,
  });

  try {
    const savedPayment = await payment.save();
    res.send({ savedPayment });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const payCheck = async (req, res) => {
  const { entreprise, duration, amount, checkNumber, checkDate } = req.body;

  const payment = new Payment({
    entreprise,
    method: "check",
    duration,
    amount,
    checkNumber,
    checkDate,
  });

  try {
    const savedPayment = await payment.save();
    res.send({ savedPayment });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deletePayment = async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (payment) {
    await Payment.deleteOne({ _id: payment._id });
    res.json({ message: "Payment deleted successfully." });
  } else {
    res.status(404).json("Payment not found");
  }
};

const updatePayCash = async (req, res) => {
  const { entreprise, duration, paymentDate, amount } = req.body;

  let updatedFields = { entreprise, duration, paymentDate, amount };

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      updatedFields
    );

    if (updatedPayment) {
      await res.json({
        message: "Payment updated successfully",
        updatedPayment,
      });
    } else {
      res.status(404).json("Payment not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePayCheck = async (req, res) => {
  const { entreprise, duration, amount, checkNumber, checkDate } = req.body;

  let updatedFields = { entreprise, duration, amount, checkNumber, checkDate };

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      updatedFields
    );

    if (updatedPayment) {
      await res.json({
        message: "Payment updated successfully",
        updatedPayment,
      });
    } else {
      res.status(404).json("Payment not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Display functions
const getAllPayments = async (req, res) => {
  const payments = await Payment.find().populate("entreprise", "name");
  res.status(200).json(payments);
};

const getAllCashPayments = async (req, res) => {
  const payments = await Payment.find({ method: "cash" }).populate(
    "entreprise",
    "name"
  );
  res.status(200).json(payments);
};

const getAllCheckPayments = async (req, res) => {
  const payments = await Payment.find({ method: "check" }).populate(
    "entreprise",
    "name"
  );

  res.status(200).json(payments);
};

const paymentInfo = async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (payment) {
    res.json(payment);
  } else {
    res.status(404).json("Payment not found.");
  }
};

module.exports = {
  payCheck,
  payCash,
  updatePayCheck,
  updatePayCash,
  deletePayment,
  getAllCashPayments,
  getAllPayments,
  getAllCashPayments,
  getAllCheckPayments,
  paymentInfo,
};
