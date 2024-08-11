"use client"
import React, { useState, useEffect } from 'react';

const TicketsTable = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://zkyeza1yt2.execute-api.us-east-1.amazonaws.com/dev/tickets');
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const updateTicket = async (id, updatedTicket) => {
    try {
      setTickets(tickets.map(ticket => ticket.id === id ? updatedTicket : ticket));
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const deleteTicket = async (id) => {
    try {
      setTickets(tickets.filter(ticket => ticket.id !== id));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Event Name</th>
            <th className="py-3 px-6 text-left">Rate</th>
            <th className="py-3 px-6 text-left">Issue Date</th>
            <th className="py-3 px-6 text-left">User Name</th>
            <th className="py-3 px-6 text-left">Ticket Price</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {tickets.map(ticket => (
            <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{ticket.eventName}</td>
              <td className="py-3 px-6 text-left">{ticket.rate}</td>
              <td className="py-3 px-6 text-left">{new Date(ticket.issueDate).toLocaleDateString()}</td>
              <td className="py-3 px-6 text-left">{ticket.userName}</td>
              <td className="py-3 px-6 text-left">${ticket.ticketPrice}</td>
              <td className="py-3 px-6 text-center">
                <button 
                  onClick={() => updateTicket(ticket.id, ticket)} 
                  className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteTicket(ticket.id)} 
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

export default TicketsTable;
