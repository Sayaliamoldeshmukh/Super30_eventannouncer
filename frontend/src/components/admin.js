import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Calendar, MapPin, Users } from "lucide-react";

const sampleEvents = [
  {
    id: 1,
    title: "Tech Conference 2024",
    date: "2024-03-15",
    time: "10:00 AM",
    location: "Main Auditorium",
    attendees: 150,
    status: "Published",
    description: "Annual Tech Conference"
  },
  {
    id: 2,
    title: "Cultural Festival",
    date: "2024-03-20",
    time: "2:00 PM",
    location: "Campus Grounds",
    attendees: 300,
    status: "Draft",
    description: "Cultural celebration with performances"
  },
  {
    id: 3,
    title: "Career Fair",
    date: "2024-03-25",
    time: "9:00 AM",
    location: "Sports Complex",
    attendees: 200,
    status: "Published",
    description: "Meet with top employers"
  },
];

export default function SuperAdminEvents() {
  const [events, setEvents] = useState(sampleEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEdit = (event) => setSelectedEvent(event);
  const handleClose = () => setSelectedEvent(null);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Event Management</h1>
      <p className="text-gray-500 mb-6">Manage your campus events and track attendee engagement</p>

      {/* Event Actions */}
      <div className="flex items-center gap-4 mb-6">
        <Button className="bg-black text-white">+ Add Event</Button>
        <Button variant="outline">📋 Bulk Update</Button>
        <Button className="bg-red-600 text-white">🗑️ Delete Selected</Button>
      </div>

      {/* Event Table */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4">Managed Events</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="pb-2">Event Title</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>Attendees</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id} className="border-b hover:bg-gray-100">
                <td className="py-2">{event.title}</td>
                <td><Calendar className="inline mr-1" size={16} />{event.date} at {event.time}</td>
                <td><MapPin className="inline mr-1" size={16} />{event.location}</td>
                <td><Users className="inline mr-1" size={16} />{event.attendees}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${event.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {event.status}
                  </span>
                </td>
                <td className="flex gap-2 py-2">
                  <Button size="icon" variant="outline" onClick={() => handleEdit(event)}><Pencil size={16} /></Button>
                  <Button size="icon" variant="destructive"><Trash2 size={16} /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h3 className="text-xl font-semibold mb-4">Edit Event</h3>
            <label className="block mb-2">Event Title</label>
            <input className="w-full border rounded p-2 mb-3" defaultValue={selectedEvent.title} />
            <label className="block mb-2">Date</label>
            <input className="w-full border rounded p-2 mb-3" type="date" defaultValue={selectedEvent.date} />
            <label className="block mb-2">Time</label>
            <input className="w-full border rounded p-2 mb-3" type="time" />
            <label className="block mb-2">Location</label>
            <input className="w-full border rounded p-2 mb-3" defaultValue={selectedEvent.location} />
            <label className="block mb-2">Description</label>
            <textarea className="w-full border rounded p-2 mb-3" defaultValue={selectedEvent.description}></textarea>
            <Button className="w-full bg-black text-white">Update Event</Button>
            <button onClick={handleClose} className="text-red-600 mt-2 w-full">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
