/**
 * Events Routes /api/events
 */

const { router } = require('express');

router.get('/', getEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.put('/:id', deleteEvent);
