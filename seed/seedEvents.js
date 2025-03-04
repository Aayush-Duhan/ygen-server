const mongoose = require('mongoose');
const Event = require('../models/Event');

// Helper function to format date
const formatDate = (startDate, endDate) => {
  const startDateStr = startDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  if (endDate) {
    const endDateStr = endDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    return `${startDateStr} - ${endDateStr}`;
  }
  return startDateStr;
};

const events = [
  // Events
  {
    name: 'Web Development Workshop',
    startDate: new Date('2025-03-15'),
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    location: 'Tech Lab, Building A',
    type: 'offline',
    description: 'Learn the basics of web development with HTML, CSS, and JavaScript.',
    image: 'https://example.com/web-dev-workshop.jpg',
    category: 'workshop'
  },
  {
    name: 'UI/UX Design Masterclass',
    startDate: new Date('2025-03-22'),
    date: formatDate(new Date('2025-03-22')),
    time: '3:00 PM - 6:00 PM',
    location: 'Online (Zoom)',
    type: 'online',
    description: 'Learn the principles of effective UI/UX design from industry professionals.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    category: 'event'
  },
  // Workshops
  {
    name: 'Mobile App Development',
    startDate: new Date('2025-03-25'),
    date: formatDate(new Date('2025-03-25')),
    time: '2:00 PM - 6:00 PM',
    location: 'Tech Hub, Room 301',
    type: 'offline',
    description: 'Intensive workshop on building cross-platform mobile applications using React Native.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
    category: 'workshop'
  },
  {
    name: 'Cloud Computing Workshop',
    startDate: new Date('2025-03-28'),
    date: formatDate(new Date('2025-03-28')),
    time: '3:00 PM - 5:00 PM',
    location: 'Online (Microsoft Teams)',
    type: 'online',
    description: 'Learn about cloud architecture and deployment using AWS and Azure.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    category: 'workshop'
  },
  // Hackathons
  {
    name: 'Code for Change 2025',
    startDate: new Date('2025-04-01'),
    endDate: new Date('2025-04-03'),
    startTime: '09:00 AM',
    endTime: '05:00 PM',
    location: 'Innovation Hub',
    type: 'offline',
    description: 'A three-day hackathon focused on developing solutions for social good.',
    image: 'https://example.com/hackathon.jpg',
    category: 'hackathon'
  },
  {
    name: 'Virtual Innovation Challenge',
    startDate: new Date('2025-05-15'),
    endDate: new Date('2025-05-16'),
    startTime: '10:00 AM',
    endTime: '04:00 PM',
    location: 'Online (Zoom)',
    type: 'online',
    description: 'A virtual hackathon bringing together innovators from around the world.',
    image: 'https://example.com/virtual-hackathon.jpg',
    category: 'hackathon'
  },
  // Additional Events
  {
    name: 'AI/ML Workshop Series',
    startDate: new Date('2025-06-01'),
    startTime: '02:00 PM',
    endTime: '05:00 PM',
    location: 'Online (Google Meet)',
    type: 'online',
    description: 'Introduction to Artificial Intelligence and Machine Learning concepts.',
    image: 'https://example.com/ai-workshop.jpg',
    category: 'workshop'
  },
  {
    name: 'Cybersecurity Summit',
    startDate: new Date('2025-04-05'),
    date: formatDate(new Date('2025-04-05')),
    time: '10:00 AM - 5:00 PM',
    location: 'Conference Hall A',
    type: 'offline',
    description: 'Expert talks and hands-on sessions on latest cybersecurity trends and practices.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    category: 'event'
  },
  {
    name: 'Game Development Bootcamp',
    startDate: new Date('2025-04-20'),
    date: formatDate(new Date('2025-04-20')),
    time: '11:00 AM - 4:00 PM',
    location: 'Tech Hub, Room 201',
    type: 'offline',
    description: 'Learn game development using Unity and create your first 2D game.',
    image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=2070&auto=format&fit=crop',
    category: 'workshop'
  },
  {
    name: 'BlockChain Hackathon',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-05-02'),
    date: formatDate(new Date('2025-05-01'), new Date('2025-05-02')),
    time: '9:00 AM - 6:00 PM',
    location: 'Innovation Center',
    type: 'offline',
    description: 'Build decentralized applications and explore blockchain technology.',
    image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=2070&auto=format&fit=crop',
    category: 'hackathon'
  }
];

const seedEvents = async () => {
  try {
    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Insert new events
    const createdEvents = await Event.insertMany(events);
    console.log(`Successfully seeded ${createdEvents.length} events`);

    // Log the categories count
    const categories = createdEvents.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {});
    console.log('Events by category:', categories);

  } catch (error) {
    console.error('Error seeding events:', error);
  }
};

module.exports = seedEvents; 