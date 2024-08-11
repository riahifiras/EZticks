"use client"
import React, { useState, useEffect } from 'react';

const EventsTable = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://eea5ym4cdf.execute-api.us-east-1.amazonaws.com/dev/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const updateEvent = async (id, updatedEvent) => {
    try {
      setEvents(events.map(event => event.id === id ? updatedEvent : event));
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Location</th>
            <th className="py-3 px-6 text-left">Date & Time</th>
            <th className="py-3 px-6 text-left">Slots</th>
            <th className="py-3 px-6 text-left">Ticket Price</th>
            <th className="py-3 px-6 text-left">Image</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {events.map(event => (
            <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{event.title}</td>
              <td className="py-3 px-6 text-left">{event.location}</td>
              <td className="py-3 px-6 text-left">{new Date(event.datetime).toLocaleString()}</td>
              <td className="py-3 px-6 text-left">{event.slots}</td>
              <td className="py-3 px-6 text-left">${event.ticketprice}</td>
              <td className="py-3 px-6 text-left">
                <img src={event.pic} alt={event.title} className="h-16 w-16 object-cover rounded-lg" />
              </td>
              <td className="py-3 px-6 text-center">
                <button 
                  onClick={() => updateEvent(event.id, event)} 
                  className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteEvent(event.id)} 
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
