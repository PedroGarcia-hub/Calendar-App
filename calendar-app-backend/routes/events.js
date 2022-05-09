/**
 * Events Routes /api/events
 */
const { JWTValidator } = require('../middlewares/jwt-validator');
const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/field-validator');
const { isDate } = require('../helpers/isDate');
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
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateField,
  ],
  createEvent
);

/**
 * Update event endpoint
 */
router.put('/:id', updateEvent);

/**
 * Delete event endpoint
 */
router.delete('/:id', deleteEvent);

module.exports = router;
