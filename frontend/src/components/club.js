import React, { useState } from 'react';
import './club.css';
import Navbar from './navbar.js';

const clubs = [
  {
    id: 1,
    name: "MAC Club",
    logo: "/images/mac.png",
    description: "A community for coders to grow through competitions, mentorship, and workshops.",
    about: "MAC (MITAOE’s ACM Chapter) is dedicated to helping students learn competitive programming, web development, and AI/ML through events, hackathons, and regular coding contests.",
    facultyCoordinator: "Prof. Shirdhar Khandekar",
    studentHead: "Prathamesh Katkhade",
    email: "mac@mitaoe.edu.in",
    instagram: "https://instagram.com/macclub",
    achievements: [
      "Secured 1st place in ACM ICPC regional qualifiers.",
      "Hosted CodeStorm Hackathon with 300+ participants.",
      "Organized weekly DSA mentorship programs."
    ]
  },
  {
    id: 2,
    name: "Knowledge Network",
    logo: "/images/knowledge.jpg",
    description: "Promotes creative thinking and expression through debates, quizzes, and literature.",
    about: "The Knowledge Network encourages idea exchange and communication through activities like quiz fests, elocution competitions, and TED-style talks.",
    facultyCoordinator: "Dr. Anjali Kulkarni",
    studentHead: "Sarthak Dumbare",
    email: "kn@mitaoe.edu.in",
    instagram: "https://instagram.com/knclub",
    achievements: [
      "Winners of Intercollege Debate Competition 2024.",
      "Conducted TEDxYouth Event with renowned speakers.",
      "Launched 'INK Talks' series with 15+ student speakers."
    ]
  },
  {
    id: 3,
    name: "GDSC",
    logo: "/images/gdsc.png",
    description: "Google Developer Student Club of MITAOE focusing on real-world tech.",
    about: "GDSC MITAOE connects developers through study jams, speaker sessions, and Google-led initiatives to build tech for community solutions.",
    facultyCoordinator: "Prof. Akshay Jadhav",
    studentHead: "Tanmay Patil",
    email: "gdsc@mitaoe.edu.in",
    instagram: "https://instagram.com/gdscmitaoe",
    achievements: [
      "Recognized as Top Performing GDSC in Maharashtra (2023).",
      "Hosted Android Study Jams with 250+ attendees.",
      "Developed 'MITAOE Connect' App as community project."
    ]
  },
  {
    id: 4,
    name: "Aero Club",
    logo: "/images/aero.jpg",
    description: "Build and fly aircraft models while understanding aerodynamics.",
    about: "Aero Club introduces students to aeromodelling and drone building via projects and competitions involving RC planes and gliders.",
    facultyCoordinator: "Prof. Rakesh Singh",
    studentHead: "Akash Mehta",
    email: "aero@mitaoe.edu.in",
    instagram: "https://instagram.com/aeroclub",
    achievements: [
      "Won National RC Plane Competition 2024.",
      "Built and tested India's longest-flying glider model.",
      "Organized AeroFest with 15+ flying demos."
    ]
  },
  {
    id: 5,
    name: "ShutterBugs",
    logo: "/images/shutterbug.jpg",
    description: "For those who see the world through a lens.",
    about: "ShutterBugs captures MITAOE’s moments through photography contests, photo walks, and creative visual storytelling.",
    facultyCoordinator: "Ms. Priya Deshmukh",
    studentHead: "Mansi Shah",
    email: "shutterbugs@mitaoe.edu.in",
    instagram: "https://instagram.com/shutterbugsmitaoe",
    achievements: [
      "Official photographers of MITAOE Annual Fest 2024.",
      "Photos published in Pune Times Campus Edition.",
      "Held monthly photo walk events around Pune."
    ]
  },
  {
    id: 6,
    name: "Drone Club",
    logo: "/images/drone.jpg",
    description: "Explore UAVs, drone coding and hardware design.",
    about: "Drone Club lets you design, code and fly quadcopters. Students build drone prototypes and participate in national-level tech expos.",
    facultyCoordinator: "Mr. Sandeep Patil",
    studentHead: "Kunal Sharma",
    email: "drone@mitaoe.edu.in",
    instagram: "https://instagram.com/droneclub",
    achievements: [
      "Won 'DroneX' Tech Challenge 2024 at IIT Bombay.",
      "Developed autonomous drone navigation system.",
      "Collaborated with MITAOE E&TC dept for real-time drone telemetry project."
    ]
  },
  {
  id: 7,
  name: "Super30 Club",
  logo: "/images/super30.png",
  description: "Elite training for 30 selected students in tech & placement skills.",
  about: "Super30 is a prestigious technical and placement-oriented initiative designed to upskill 30 handpicked students through expert sessions, mock interviews, coding marathons, and soft skill grooming. The club partners with top recruiters to prepare students for high-impact placements.",
  facultyCoordinator: "Dr. Anuraddha Pawar",
  studentHead: "Raj Singh",
  email: "super30@mitaoe.edu.in",
  instagram: "https://instagram.com/super30club",
  achievements: [
    "100% placement rate in 2024 for Super30 batch.",
    "Conducted 50+ mock interviews and coding sessions with industry experts.",
    "Alumni placed in Amazon, Infosys, and TCS Digital."
  ]
},
{
  id: 8,
  name: "NSS Club",
  logo: "/images/nss.jpg",
  description: "Community service, social awareness, and volunteerism.",
  about: "The NSS Club fosters a spirit of social responsibility and volunteerism among students. Through blood donation drives, cleanliness campaigns, health awareness programs, and rural education initiatives, NSS members contribute actively toward nation-building.",
  facultyCoordinator: "Prof. Hussain Shaikh",
  studentHead: "Sushil Hogale",
  email: "nss@mitaoe.edu.in",
  instagram: "https://instagram.com/nssmitaoe",
  achievements: [
    "Organized 10+ blood donation camps with over 500 donors.",
    "Won 'Best Social Impact Club' award by Savitribai Phule Pune University.",
    "Adopted a rural school and provided digital learning tools."
  ]
},
{
  id: 9,
  name: "Girlscript Club",
  logo: "/images/girlscript.jpg",
  description: "Empowering women in tech through code and leadership.",
  about: "Girlscript MITAOE Chapter is part of India’s largest tech community for women. The club provides an inclusive platform for students to learn web development, AI/ML, and leadership through bootcamps, hackathons, and mentorship programs.",
  facultyCoordinator: "Dr. Neha Bhosale",
  studentHead: "Simran Patil",
  email: "girlscript@mitaoe.edu.in",
  instagram: "https://instagram.com/girlscriptmitaoe",
  achievements: [
    "Hosted Maharashtra’s largest all-women hackathon – HackHerCode 2024.",
    "Conducted 12+ workshops on web, ML, and Git for 300+ students.",
    "Collaborated with Google Developer Student Club and Women Techmakers."
  ]
},
{
  id: 10,
  name: "Niyudrath",
  logo: "/images/logo14.jpg",
  description: "Fuel your passion for speed and engineering.",
  about: "Niyudrath is MITAOE's karting club, where engineering meets adrenaline. The club designs, builds, and races high-performance go-karts, giving students hands-on experience in automotive engineering and team collaboration.",
  facultyCoordinator: "Mr. Sandeep Patil",
  studentHead: "Rohan Kulkarni",
  email: "niyudrath@mitaoe.edu.in",
  instagram: "https://instagram.com/niyudrathmitaoe",
  achievements: [
    "Winners of the National Go-Kart Championship 2024.",
    "Best Engineering Design Award at GKDC 2023.",
    "Conducted MITAOE’s first in-house karting showcase."
  ]
},
{
  id: 11,
  name: "Invictus",
  logo: "/images/logo13.jpg",
  description: "Building the future, one robot at a time.",
  about: "Invictus is MITAOE’s robotics club that inspires innovation through automation and technology. The club engages in robotics competitions, workshops, and projects ranging from line-followers to AI-powered bots.",
  facultyCoordinator: "Dr. Ashwini Joshi",
  studentHead: "Aditya Mehta",
  email: "invictus@mitaoe.edu.in",
  instagram: "https://instagram.com/invictusmitaoe",
  achievements: [
    "Champions of TechFest Robotics Challenge, IIT Bombay 2024.",
    "Hosted the annual RoboWars competition at MITAOE.",
    "Developed autonomous bots for inter-departmental projects."
  ]
},
{
  id: 12,
  name: "Menance",
  logo: "/images/logo12.jpg",
  description: "Where passion meets the rhythm.",
  about: "Menance is MITAOE’s official dance club that brings together dancers from all styles and backgrounds. From street to classical, the club performs, competes, and conducts workshops that celebrate the art of movement.",
  facultyCoordinator: "Ms. Neha Kale",
  studentHead: "Aarohi Deshmukh",
  email: "menance@mitaoe.edu.in",
  instagram: "https://instagram.com/menancemitaoe",
  achievements: [
    "Winners of the Inter-College Dance Battle at COEP Zest 2024.",
    "Featured in the Pune Dance Carnival 2023.",
    "Organized the MITAOE Street Dance Showdown."
  ]
},
{
  id: 13,
  name: "CodeChef Club",
  logo: "/images/logo11.jpg",
  description: "Crack the code, shape the future.",
  about: "CodeChef Club at MITAOE fosters a strong coding culture among students by organizing coding contests, hackathons, and peer learning sessions. The club encourages problem-solving, competitive programming, and career-oriented coding practices.",
  facultyCoordinator: "Mr. Rajesh Kulkarni",
  studentHead: "Siddharth Verma",
  email: "codechef@mitaoe.edu.in",
  instagram: "https://instagram.com/codechefmitaoe",
  achievements: [
    "Hosted MITAOE’s largest inter-college coding contest 'CodeStorm 2024'.",
    "Ranked among the top campus chapters on CodeChef platform.",
    "Mentored students who qualified for ACM ICPC Regionals."
  ]
},
{
  id: 14,
  name: "SPARK Club",
  logo: "/images/logo10.jpg",
  description: "Igniting innovation through electronics.",
  about: "SPARK is the official technical club of the E&TC department at MITAOE. It conducts hands-on workshops, seminars, and events focused on electronics, embedded systems, IoT, and communication technologies to bridge the gap between theory and real-world applications.",
  facultyCoordinator: "Dr. Snehal More",
  studentHead: "Priyanshi Patil",
  email: "spark@mitaoe.edu.in",
  instagram: "https://instagram.com/sparkmitaoe",
  achievements: [
    "Organized the flagship tech event 'Circuitrix 2024'.",
    "Hosted IoT Hackathon with over 30 working prototypes.",
    "Collaborated with industry experts for technical sessions and training."
  ]
}


];

const Clubs = () => {
  const [selectedClub, setSelectedClub] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClubs = clubs
    .filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={`min-h-screen bg-gray-50 ${selectedClub ? 'backdrop-blur-sm' : ''}`}>
      <Navbar />

      <div>
        {/* Header */}
        <header className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 overflow-hidden">
          {/* Sparkle stars */}
          {Array.from({ length: 25 }).map((_, index) => (
            <img
              key={index}
              src="/assets/star.png"
              alt="Sparkle"
              className="absolute w-3 h-3 sparkle pointer-events-none"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}

          <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between relative z-10">
            <div className="md:w-1/2 text-center md:text-left mt-10 md:mt-0">
              <h1 className="text-5xl font-bold text-white mb-4">CLUBS</h1>
              <p className="text-xl text-yellow-300 max-w-md">
                "Discover, Create, Connect – Join a club and explore your passion at MITAOE."
              </p>
            </div>

            <div className="md:w-1/2 flex justify-center md:justify-end gap-6 flex-wrap">
              {['/images/club1.jpg', '/images/club2.jpg', '/images/club3.jpg'].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Club ${index + 1}`}
                  className={`w-36 h-36 object-cover rounded-md shadow-lg animate-float${index % 2 === 0 ? '1' : '2'}`}
                />
              ))}
            </div>
          </div>
        </header>

        {/* Club Cards */}
        <section className="px-6 pt-6 pb-10">
          {!selectedClub ? (
            <>
              {/* Search Bar */}
              <div className="mb-6 max-w-3xl mx-auto">
                <input
                  type="text"
                  placeholder="Search clubs by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredClubs.map(club => (
                  <div key={club.id} className="bg-white rounded-xl shadow-lg shadow-purple-300 p-6 text-center hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={club.logo}
                      alt={club.name}
                      className="w-32 h-32 mx-auto mb-4 object-cover rounded-full border-2 border-white-500 shadow"
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{club.name}</h3>
                    <button
                      onClick={() => setSelectedClub(club)}
                      className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full mx-4 relative overflow-y-auto max-h-[90vh]">
                <button
                  onClick={() => setSelectedClub(null)}
                  className="absolute top-3 right-4 text-gray-600 hover:text-red-600 text-5xl"
                >
                  &times;
                </button>

                {/* Gradient Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-lg flex flex-col md:flex-row items-center gap-6">
                  <img src={selectedClub.logo} alt={selectedClub.name} className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg" />
                  <div>
                    <h2 className="text-3xl font-bold">{selectedClub.name}</h2>
                    <p className="text-white/90 mt-2">{selectedClub.description}</p>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-3 border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50">
                  <h3 className="text-2xl font-semibold text-indigo-700 mb-2">About Us</h3>
                  <p className="text-gray-700">{selectedClub.about}</p>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50">
                    <h4 className="text-lg font-semibold text-indigo-700 mb-2"> Faculty Coordinator</h4>
                    <p className="text-gray-800">{selectedClub.facultyCoordinator}</p>
                  </div>

                  <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50">
                    <h4 className="text-lg font-semibold text-indigo-700 mb-2"> Contact Information</h4>
                    <p className="text-gray-800">
                      Email: <a href={`mailto:${selectedClub.email}`} className="text-blue-600 underline">{selectedClub.email}</a>
                    </p>
                    <p>
                      Instagram: <a href={selectedClub.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Visit</a>
                    </p>
                  </div>

                  <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50">
                    <h4 className="text-lg font-semibold text-indigo-700 mb-2"> Student Head</h4>
                    <p className="text-gray-800">{selectedClub.studentHead}</p>
                  </div>

                  <div className="border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50 md:col-span-3">
                    <h4 className="text-lg font-semibold text-indigo-700 mb-2">🏆 Achievements</h4>
                    {selectedClub.achievements && selectedClub.achievements.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-800 space-y-1">
                        {selectedClub.achievements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No achievements listed yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
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
    </div>
  );
};

export default Clubs;
