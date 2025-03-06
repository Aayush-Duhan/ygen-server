const express = require('express');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

let events = []; // Temporary storage (replace with MongoDB)

// Get all events
router.get('/', authMiddleware, (req, res) => {
  res.json(events);
});

// Get event by ID
router.get('/:id', authMiddleware, (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
});

// Create a new event
router.post(
  '/',
  [authMiddleware, [check('name', 'Event name is required').not().isEmpty()]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const event = { id: Date.now().toString(), ...req.body };
    events.push(event);
    res.status(201).json(event);
  }
);

// Update an event
router.put('/:id', authMiddleware, (req, res) => {
  const eventIndex = events.findIndex(e => e.id === req.params.id);
  if (eventIndex === -1) return res.status(404).json({ message: 'Event not found' });

  events[eventIndex] = { ...events[eventIndex], ...req.body };
  res.json(events[eventIndex]);
});

// Delete an event
router.delete('/:id', authMiddleware, (req, res) => {
  events = events.filter(e => e.id !== req.params.id);
  res.json({ message: 'Event deleted successfully' });
});

module.exports = router;