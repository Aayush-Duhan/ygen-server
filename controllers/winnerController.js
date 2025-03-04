const Winner = require('../models/Winner');
const Event = require('../models/Event');

// Add or update winners for an event
exports.addOrUpdateWinners = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { first, second, third } = req.body;

    // Validate event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Find existing winners or create new ones
    let winner = await Winner.findOne({ eventId });
    
    if (winner) {
      // Update existing winners
      winner.first = first;
      winner.second = second;
      winner.third = third;
      await winner.save();
    } else {
      // Create new winners
      winner = new Winner({
        eventId,
        first,
        second,
        third
      });
      await winner.save();
    }

    res.status(200).json(winner);
  } catch (error) {
    console.error('Error in addOrUpdateWinners:', error);
    res.status(500).json({ message: 'Error adding/updating winners', error: error.message });
  }
};

// Get winners for an event
exports.getWinners = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const winner = await Winner.findOne({ eventId });
    if (!winner) {
      return res.status(404).json({ message: 'Winners not found for this event' });
    }

    res.status(200).json(winner);
  } catch (error) {
    console.error('Error in getWinners:', error);
    res.status(500).json({ message: 'Error fetching winners', error: error.message });
  }
};

// Delete winners for an event
exports.deleteWinners = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const winner = await Winner.findOneAndDelete({ eventId });
    if (!winner) {
      return res.status(404).json({ message: 'Winners not found for this event' });
    }

    res.status(200).json({ message: 'Winners deleted successfully' });
  } catch (error) {
    console.error('Error in deleteWinners:', error);
    res.status(500).json({ message: 'Error deleting winners', error: error.message });
  }
}; 