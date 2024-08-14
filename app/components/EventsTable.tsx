"use client";
import React, { useState, useEffect } from 'react';

const EventsTable = () => {
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState({});
  const [newImage, setNewImage] = useState(null);

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

  const handleEdit = (id, event) => {
    setEditId(id);
    setUpdatedEvent(event);
    setNewImage(null); 
  };

  const handleSave = async (id) => {
    const putUrl = `https://eea5ym4cdf.execute-api.us-east-1.amazonaws.com/dev/events/${id}`;
    
    if (newImage) {
        updatedEvent.pic = newImage;
    }

    console.log('Updated Event:', updatedEvent);  

    try {
        const response = await fetch(putUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEvent),
        });

        if (response.ok) {
            console.log('Update successful:', response);
            setEvents(events.map(event => event.id === id ? updatedEvent : event));
            setEditId(null);
            setNewImage(null); 
        } else {
            console.error('Error updating event:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating event:', error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setNewImage(null); 
    setUpdatedEvent({});
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent({ ...updatedEvent, [name]: value });
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImage(reader.result); 
    };
    reader.readAsDataURL(file); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImage(reader.result); 
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (id) => {
    const deleteUrl = `https://eea5ym4cdf.execute-api.us-east-1.amazonaws.com/dev/events/${id}`;
    
    fetch(deleteUrl, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete the event.');
        }
        setEvents(prevData => prevData.filter(event => event.id !== id));
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-3 text-left">Title</th>
            <th className="py-3 px-3 text-left">Location</th>
            <th className="py-3 px-3 text-left">Date & Time</th>
            <th className="py-3 px-3 text-left">Slots</th>
            <th className="py-3 px-3 text-left">Ticket Price</th>
            <th className="py-3 px-3 text-left">Image</th>
            <th className="py-3 px-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {events.map(event => (
            <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-3 text-left">
                {editId === event.id ? (
                  <input
                    type="text"
                    name="title"
                    value={updatedEvent.title || ""}
                    onChange={handleFieldChange}
                    className="border border-gray-300 rounded p-1"
                  />
                ) : (
                  event.title
                )}
              </td>
              <td className="py-3 px-3 text-left">
                {editId === event.id ? (
                  <input
                    type="text"
                    name="location"
                    value={updatedEvent.location || ""}
                    onChange={handleFieldChange}
                    className="border border-gray-300 rounded p-1"
                  />
                ) : (
                  event.location
                )}
              </td>
              <td className="py-3 px-3 text-left">
                {editId === event.id ? (
                  <input
                    type="datetime-local"
                    name="datetime"
                    value={updatedEvent.datetime || ""}
                    onChange={handleFieldChange}
                    className="border border-gray-300 rounded p-1"
                  />
                ) : (
                  new Date(event.datetime).toLocaleString()
                )}
              </td>
              <td className="py-3 px-3 text-left">
                {editId === event.id ? (
                  <input
                    type="number"
                    name="slots"
                    value={updatedEvent.slots || ""}
                    onChange={handleFieldChange}
                    className="border border-gray-300 rounded p-1"
                  />
                ) : (
                  event.slots
                )}
              </td>
              <td className="py-3 px-3 text-left">
                {editId === event.id ? (
                  <input
                    type="number"
                    name="ticketprice"
                    value={updatedEvent.ticketprice || ""}
                    onChange={handleFieldChange}
                    className="border border-gray-300 rounded p-1"
                  />
                ) : (
                  `$${event.ticketprice}`
                )}
              </td>
              <td className="py-3 px-3 text-left">
                {editId === event.id ? (
                  <div>
                    <div
                      onDrop={handleImageDrop}
                      onDragOver={(e) => e.preventDefault()}
                      className="h-16 w-16 border border-dashed border-gray-400 rounded-lg flex items-center justify-center mb-2"
                    >
                      {newImage ? (
                        <img src={newImage} alt={updatedEvent.title} className="h-16 w-16 object-cover rounded-lg" />
                      ) : (
                        <span>Drag & Drop</span>
                      )}
                    </div>
                    <input type="file" onChange={handleFileChange} />
                  </div>
                ) : (
                  <img src={event.pic} alt={event.title} className="h-16 w-16 object-cover rounded-lg" />
                )}
              </td>
              <td className="py-3 px-3 text-center">
                {editId === event.id ? (
                  <div>
                    <button 
                      onClick={() => handleSave(event.id)} 
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
                    onClick={() => handleEdit(event.id, event)} 
                    className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(event.id)} 
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
