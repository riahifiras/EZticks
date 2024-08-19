"use client";
import React, { useState, useEffect, ChangeEvent, DragEvent } from 'react';

interface Ticket {
  id: string;
  eventName: string;
  rate: string;
  issueDate: string;
  userName: string;
  ticketPrice: number;
}

const TicketsTable: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [updatedTicket, setUpdatedTicket] = useState<Partial<Ticket>>({});

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://zkyeza1yt2.execute-api.us-east-1.amazonaws.com/dev/tickets');
        const data: Ticket[] = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleEdit = (id: string, ticket: Ticket) => {
    setEditId(id);
    setUpdatedTicket(ticket);
  };

  const handleSave = async (id: string) => {
    const putUrl = `https://zkyeza1yt2.execute-api.us-east-1.amazonaws.com/dev/tickets/${id}`;

    try {
      const response = await fetch(putUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTicket),
      });

      if (response.ok) {
        setTickets(tickets.map(ticket => ticket.id === id ? { ...ticket, ...updatedTicket } : ticket));
        setEditId(null);
      } else {
        console.error('Error updating ticket:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setUpdatedTicket({});
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id: string) => {
    const deleteUrl = `https://zkyeza1yt2.execute-api.us-east-1.amazonaws.com/dev/tickets/${id}`;

    fetch(deleteUrl, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete the ticket.');
        }
        setTickets(prevData => prevData.filter(ticket => ticket.id !== id));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-3 text-left">Event Name</th>
            <th className="py-3 px-3 text-left">Rate</th>
            <th className="py-3 px-3 text-left">Issue Date</th>
            <th className="py-3 px-3 text-left">User Name</th>
            <th className="py-3 px-3 text-left">Ticket Price</th>
            <th className="py-3 px-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {tickets.map(ticket => (
            <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-3 text-left whitespace-nowrap">
                {editId === ticket.id ? (
                  <input
                    type="text"
                    name="eventName"
                    value={updatedTicket.eventName || ""}
                    onChange={handleFieldChange}
                    className="border border-gray-300 rounded p-1"
                  />
                ) : (
                  ticket.eventName
                )}
              </td>
              <td className="py-3 px-3 text-left">
                {editId === ticket.id ? (
                  <input
                    type="text"
                    name="rate"
                    value={updatedTicket.rate || ""}
                    onChange={handleFieldChange}
                    className="border border-gray-300 rounded p-1"
                  />
                ) : (
                  ticket.rate
                )}
              </td>
              <td className="py-3 px-3 text-left">
                {editId === ticket.id ? (
                  <input
                    type="date"
                    name="issueDate"
                    value={new Date(updatedTicket.issueDate || '').toISOString().substr(0, 10) || ""}
                    onChange={handleFieldChange}
                    className="border border-gray-300 rounded p-1"
                  />
                ) : (
                  new Date(ticket.issueDate).toLocaleDateString()
                )}
              </td>
              <td className="py-3 px-3 text-left">
                {editId === ticket.id ? (
                  <input
                    type="text"
                    name="userName"
                    value={updatedTicket.userName || ""}
                    onChange={handleFieldChange}
                    className="border border-gray-300 rounded p-1"
                  />
                ) : (
                  ticket.userName
                )}
              </td>
              <td className="py-3 px-3 text-left">
                {editId === ticket.id ? (
                  <input
                    type="number"
                    name="ticketPrice"
                    value={updatedTicket.ticketPrice || ""}
                    onChange={handleFieldChange}
                    className="border border-gray-300 rounded p-1"
                  />
                ) : (
                  `$${ticket.ticketPrice}`
                )}
              </td>
              <td className="py-3 px-3 text-center">
                {editId === ticket.id ? (
                  <div>
                    <button
                      onClick={() => handleSave(ticket.id)}
                      className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white py-1 px-3 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit(ticket.id, ticket)}
                    className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(ticket.id)}
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
