const { response } = require('express');
const Event = require('../models/Event');

/**
 * Function to get events
 * @param {Request} req
 * @param {Response} res
 */
const getEvents = async (req, res = response) => {
  const events = await Event.find().populate('user', 'name');

  res.json({
    ok: true,
    events,
  });
};

/**
 * Function to create events
 * @param {Request} req
 * @param {Response} res
 */
const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const savedEvent = await event.save();
    res.json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error creating the event',
    });
  }
};

/**
 * Function to update events
 * @param {Request} req
 * @param {Response} res
 */
const updateEvent = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventoId);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: 'Can not find event',
      });
    } else if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Can not edit this event',
      });
    } else {
      const newEvent = { ...req.body, user: uid };
      const updatedEvent = await Event.findByIdAndUpdate(eventoId, newEvent, {
        new: true,
      });
      res.json({
        ok: true,
        event: updatedEvent,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Something went wrong when update event',
    });
  }
};

/**
 * Function to delete events
 * @param {Request} req
 * @param {Response} res
 */
const deleteEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'deleteEvent',
  });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
