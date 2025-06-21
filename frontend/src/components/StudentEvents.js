import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';

axios.defaults.withCredentials = true;

const StudentEvents = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
    fetchRegisteredEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events/all');
      setEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const fetchRegisteredEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/student/registered');
      setRegisteredEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await axios.post(`http://localhost:5000/api/student/register/${eventId}`);
      fetchRegisteredEvents();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          alert('You must log in to register.');
        } else if (error.response.status === 400) {
          alert('You are already registered for this event.');
        } else {
          alert('Registration failed.');
        }
      } else {
        console.error('Failed to register:', error);
        alert('Something went wrong.');
      }
    }
  };

  const today = new Date();
  const upcomingEvents = events.filter(e => new Date(e.date) >= today);
  const pastEvents = events.filter(e => new Date(e.date) < today);

  const renderEventCard = (event) => (
    <div
      key={event.id}
      className="bg-white border rounded-lg shadow-lg shadow-purple-300 p-4 w-full max-w-sm mx-auto flex flex-col justify-between cursor-pointer hover:shadow-xl transition"
      onClick={() => setSelectedEvent(event)}
    >
      <div>
        {event.poster && (
          <img
            src={`http://localhost:5000${event.poster}`}
            alt="Poster"
            className="rounded mt-2 max-h-60 w-50 object-cover mx-auto"
          />
        )}
        <h3 className="text-lg font-bold mt-2">{event.title}</h3>
        <p>
          📅 {new Date(event.date).toLocaleDateString()} | 🕒{' '}
          {new Date('1970-01-01T' + event.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <p>📍 Location: {event.location}</p>
        <p>🎓 Organized By: {event.club_name}</p>
        <p className="mt-2 text-gray-700 line-clamp-3 overflow-hidden h-[4.5em]">
          {event.description}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRegister(event.id);
        }}
        className={`mt-4 px-4 py-2 rounded ${
          registeredEvents.includes(event.id)
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-red-700'
        } text-white`}
        disabled={registeredEvents.includes(event.id)}
      >
        {registeredEvents.includes(event.id) ? 'Registered' : 'Register'}
      </button>
    </div>
  );

  return (
    <div>
      <Navbar />

      {/* Gradient Header with Animated Stars */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 overflow-hidden text-center">
         {Array.from({ length: 25 }).map((_, index) => (
            <img
              key={index}
              src="/assets/starss.png"
              alt="Sparkle"
              className="absolute w-4 h-4 sparkle pointer-events-none"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        <h1 className="relative z-10 text-4xl font-extrabold mb-2">College Events Hub</h1>
        <p className="relative z-10 text-lg italic mb-6 text-yellow-400">
          "Discover, participate, and cherish every campus moment."
        </p>
        <div className="relative z-10 flex justify-center gap-4 flex-wrap">
          <img src="/images/event-left.png" alt="img1" className="h-32 w-48 object-cover rounded-xl shadow-lg" />
          <img src="/images/event-right.jpg" alt="img2" className="h-32 w-48 object-cover rounded-xl shadow-lg" />
          <img src="/images/event-mid.jpg" alt="img3" className="h-32 w-48 object-cover rounded-xl shadow-lg" />
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="text-center my-12">
        <img src="/assets/calender.png" alt="Calendar Icon" className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-purple-700">Upcoming Events</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map(renderEventCard)
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>

      {/* Past Events */}
      <div className="text-center my-12">
        <img src="/assets/clock.png" alt="Clock Icon" className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-purple-700">Past Events</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pastEvents.length > 0 ? (
          pastEvents.map(renderEventCard)
        ) : (
          <p>No past events.</p>
        )}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </button>
            {selectedEvent.poster && (
              <img
                src={`http://localhost:5000${selectedEvent.poster}`}
                alt="Poster"
                className="rounded mb-4 max-h-60 object-cover mx-auto"
              />
            )}
            <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
            <p>
              📅 {new Date(selectedEvent.date).toLocaleDateString()} | 🕒{' '}
              {new Date('1970-01-01T' + selectedEvent.time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <p>📍 Location: {selectedEvent.location}</p>
            <p>🎓 Organized By: {selectedEvent.club_name}</p>
            <div className="mt-3 text-gray-700 whitespace-pre-wrap">
              {selectedEvent.description}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-purple-800 text-white py-8 mt-6 mb-4">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Campus Events. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default StudentEvents;