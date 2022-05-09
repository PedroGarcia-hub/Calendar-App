/**
 * Events Routes /api/events
 */
const { JWTValidator } = require('../middlewares/jwt-validator');
const { Router } = require('express');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events.js');

const router = Router();

// All request must validate their token
router.use(JWTValidator);

/**
 * Get Events endpoint
 */
router.get('/', getEvents);

/**
 * Create new events endpoint
 */
router.post('/', createEvent);

/**
 * Update event endpoint
 */
router.put('/:id', updateEvent);

/**
 * Delete event endpoint
 */
router.delete('/:id', deleteEvent);

module.exports = router;
