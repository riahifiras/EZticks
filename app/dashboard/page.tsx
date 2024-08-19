"use client"
import React, { useState } from 'react';
import TicketsTable from '../components/TicketsTable';
import EventsTable from '../components/EventsTable';
import AddEventForm from '../components/AddEventForm';
import SalesStatistics from '../components/SalesStatistics';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('statistics');

  const renderTable = () => {
    switch (activeTab) {
      case "tickets":
        return <TicketsTable />;
      case "events":
        return <EventsTable />;
      case "add-event":
        return <AddEventForm/>
      case "statistics":
        return <SalesStatistics/>
      default:
        return <TicketsTable />; 
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
      <button 
          onClick={() => setActiveTab('statistics')} 
          className={`py-2 px-4 mr-2 ${activeTab === 'statistics' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Statistics
        </button>
        <button 
          onClick={() => setActiveTab('tickets')} 
          className={`py-2 px-4 mr-2 ${activeTab === 'tickets' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Tickets
        </button>
        <button 
          onClick={() => setActiveTab('events')} 
          className={`py-2 px-4 mr-2 ${activeTab === 'events' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Events
        </button>
        <button 
          onClick={() => setActiveTab('add-event')} 
          className={`py-2 px-4 mr-2 ${activeTab === 'add-event' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Add event
        </button>
      </div>
      {renderTable()}
    </div>
  );
};

export default Dashboard;
