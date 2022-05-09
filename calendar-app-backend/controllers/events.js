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
const updateEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'updateEvent',
  });
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
