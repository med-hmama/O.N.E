const Event = require("../models/eventModel");

const createEvent = async (req, res) => {
  const { name, city, address, entrepriseId, date, description } = req.body;

  const newEvent = new Event({
    name,
    city,
    address,
    entrepriseId,
    date,
    description,
  });

  try {
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateEvent = async (req, res) => {
  const { name, city, address, entrepriseId, date, description } = req.body;

  let updatedFields = {
    name,
    city,
    address,
    entrepriseId,
    date,
    description,
  };

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updatedFields
    );

    if (updatedEvent) {
      await res.json({ message: "Event updated successfully", updatedEvent });
    } else {
      res.status(404).json("Event not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    await Event.deleteOne({ _id: event._id });
    res.json({ message: "Event deleted successfully." });
  } else {
    res.status(404).json("Event not found");
  }
};

// Display functions
const getAllEvents = async (req, res) => {
  const events = await Event.find({});
  res.status(200).json(events);
};

const eventInfo = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json("Event not found.");
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  eventInfo,
};
