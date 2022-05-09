const { response } = require('express');

/**
 * Function to get events
 * @param {Request} req
 * @param {Response} res
 */
const getEvents = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'getEvents',
  });
};

/**
 * Function to create events
 * @param {Request} req
 * @param {Response} res
 */
const createEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'createEvent',
  });
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
