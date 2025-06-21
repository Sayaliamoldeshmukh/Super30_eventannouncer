import React from 'react';
import { Link } from 'react-router-dom';

const gatheringPhotos = [
  "/images/event1.jpg",
  "/images/event2.jpg",
  "/images/event3.jpg",
  "/images/event4.jpg",
  "/images/event5.jpg",
  "/images/event6.jpg",
  "/images/event7.jpg",
  "/images/event8.jpg",
  "/images/event9.jpg",
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-15">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-white-700">Campus Events</div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-white hover:text-indigo-200 font-medium">Home</a>
              <Link to="/event" className="text-white hover:text-indigo-200 font-medium">Events</Link>
              <Link to="/club" className="text-white hover:text-indigo-200 font-medium">Clubs</Link>
              <Link to="/login" className="text-white hover:text-indigo-200 font-medium">Login</Link>
            </div>
            <button className="md:hidden text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 overflow-hidden">
         {Array.from({ length: 25 }).map((_, index) => (
            <img
              key={index}
              src="/assets/sparkling.png"
              alt="Sparkle"
              className="absolute w-5 h-5 sparkle pointer-events-none"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}

        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold leading-tight">
            MITAOE’s<br />
            <span className="text-yellow-400">Campus Events</span>
          </h1>
          <p className="mt-4 text-xl">Discover amazing events, connect with clubs, and make unforgettable memories.</p>
          <p className="mt-2 text-xl">
            Your gateway to an incredible college experience starts here.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="pt-12 pb-12 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <img
            src="/assets/calender.png"
            alt="Calendar Icon"
            className="w-12 h-12 mx-auto mb-4"
          />
          <h2 className="text-4xl font-bold text-purple-700 mb-4">How It Works</h2>
          <p className="text-gray-600 mb-10 text-lg">Getting involved in campus life is easy. Follow these simple steps to start your journey.</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border rounded-lg shadow-lg shadow-purple-300 p-8 w-full max-w-xs mx-auto">
              <div className="text-purple-600 text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">Discover Events</h3>
              <p className="text-gray-600">Browse through a variety of events happening across campus. Filter by your interests and find what excites you.</p>
            </div>
            <div className="bg-white border rounded-lg shadow-lg shadow-purple-300 p-8 w-full max-w-xs mx-auto">
              <div className="text-purple-600 text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Register for Events</h3>
              <p className="text-gray-600">Sign up for events that interest you and get reminders. Track your registrations and never miss an important event.</p>
            </div>
            <div className="bg-white border rounded-lg shadow-lg shadow-purple-300 p-8 w-full max-w-xs mx-auto">
              <div className="text-purple-600 text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Explore Clubs</h3>
              <p className="text-gray-600">Learn about different clubs and organizations on campus. Discover what each club offers and their upcoming activities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Gallery Section */}
      <section className="pt-8 pb-16 bg-gray-50 px-8 sm:px-16 md:px-24">
        <div className="text-center mb-10">
          <img
            src="/assets/camera.jpg"
            alt="Gallery Icon"
            className="w-12 h-12 mx-auto mb-4"
          />
          <h2 className="text-4xl font-bold text-purple-700">Event Gallery</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img
              src="/images/firodiya.jpg"
              alt="Firodiya"
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
              <h3 className="text-white text-xl font-semibold">Firodiya</h3>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img
              src="/images/annual-sports.jpg"
              alt="Sports"
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
              <h3 className="text-white text-xl font-semibold">Annual Sports</h3>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img
              src="/images/club-event.jpg"
              alt="clubs"
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
              <h3 className="text-white text-xl font-semibold">Club Event</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Nakshatra Section */}
      <section className="relative px-8 sm:px-16 md:px-24 pt-10 pb-6 text-center">
        <img
          src="/assets/mandola.png"
          alt="Mandala Art"
          className="absolute left-13 bottom-0 w-40 sm:w-56 md:w-64" 
          style={{ transform: "translateY(35%)" }}
        />
        <h2 className="text-4xl font-bold text-purple-800 z-10 relative">Nakshatra</h2>
        <p className="mt-2 text-lg text-gray-700 z-10 relative">Some glimpse of the MITAOE's annual function</p>
      </section>

      {/* Gathering Photos */}
      <section className="px-8 sm:px-16 md:px-24 py-10">
        <div className="max-w-7xl mx-auto rounded-xl p-6" style={{ backgroundColor: "#FFECB3" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {gatheringPhotos.map((src, idx) => (
              <div key={idx} className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src={src}
                  alt={`College Event ${idx + 1}`}
                  className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Campus Events. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
