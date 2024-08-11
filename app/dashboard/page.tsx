"use client"
import React, { useState } from 'react';
import TicketsTable from '../components/TicketsTable';
import EventsTable from '../components/EventsTable';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tickets');

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button 
          onClick={() => setActiveTab('tickets')} 
          className={`py-2 px-4 mr-2 ${activeTab === 'tickets' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Tickets
        </button>
        <button 
          onClick={() => setActiveTab('events')} 
          className={`py-2 px-4 ${activeTab === 'events' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Events
        </button>
      </div>

      {activeTab === 'tickets' ? <TicketsTable /> : <EventsTable />}
    </div>
  );
};

export default Dashboard;
