const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true,
    default: function() {
      if (this.startDate) {
        const startDateStr = this.startDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        if (this.endDate) {
          const endDateStr = this.endDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
          return `${startDateStr} - ${endDateStr}`;
        }
        return startDateStr;
      }
      return undefined;
    }
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  time: {
    type: String,
    required: true,
    default: function() {
      if (this.startTime) {
        if (this.endTime) {
          return `${this.startTime} - ${this.endTime}`;
        }
        return this.startTime;
      }
      return undefined;
    }
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['online', 'offline'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['event', 'workshop', 'hackathon'],
    required: true
  }
}, {
  timestamps: true
});

// Pre-save middleware to format the date and time strings
EventSchema.pre('save', function(next) {
  // Format date string
  if (this.startDate) {
    const startDateStr = this.startDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    if (this.endDate) {
      const endDateStr = this.endDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      this.date = `${startDateStr} - ${endDateStr}`;
    } else {
      this.date = startDateStr;
    }
  }

  // Format time string
  if (this.startTime) {
    if (this.endTime) {
      this.time = `${this.startTime} - ${this.endTime}`;
    } else {
      this.time = this.startTime;
    }
  }

  next();
});

module.exports = mongoose.model('Event', EventSchema);