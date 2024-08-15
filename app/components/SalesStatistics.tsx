import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SalesStatistics = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://zkyeza1yt2.execute-api.us-east-1.amazonaws.com/dev/tickets/');
        const data = await response.json();
        setTickets(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Calculate statistics
  const revenueOverTime = {};
  const ticketsSoldByEvent = {};
  const revenueByEvent = {};
  const ticketTypeDistribution = {};

  let totalRevenue = 0;

  tickets.forEach(ticket => {
    const date = new Date(ticket.issueDate).toISOString().split('T')[0]; // Extract YYYY-MM-DD
    const { ticketPrice, eventName, rate } = ticket;

    // Revenue over time
    if (revenueOverTime[date]) {
      revenueOverTime[date] += ticketPrice;
    } else {
      revenueOverTime[date] = ticketPrice;
    }

    // Tickets sold by event
    if (ticketsSoldByEvent[eventName]) {
      ticketsSoldByEvent[eventName] += 1;
    } else {
      ticketsSoldByEvent[eventName] = 1;
    }

    // Revenue by event
    if (revenueByEvent[eventName]) {
      revenueByEvent[eventName] += ticketPrice;
    } else {
      revenueByEvent[eventName] = ticketPrice;
    }

    // Ticket type distribution
    if (ticketTypeDistribution[rate]) {
      ticketTypeDistribution[rate] += ticketPrice;
    } else {
      ticketTypeDistribution[rate] = ticketPrice;
    }

    // Total revenue calculation
    totalRevenue += ticketPrice;
  });

  // Prepare data for charts
  const revenueChart = {
    labels: Object.keys(revenueOverTime),
    datasets: [
      {
        label: 'Revenue Over Time',
        data: Object.values(revenueOverTime),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const revenueChartOptions = {
    scales: {
      x: {
        reverse: true, // Reverse the x-axis
      },
    },
  };

  const ticketsSoldChart = {
    labels: Object.keys(ticketsSoldByEvent),
    datasets: [
      {
        label: 'Tickets Sold by Event',
        data: Object.values(ticketsSoldByEvent),
        backgroundColor: 'rgba(153,102,255,0.6)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  const revenueByEventChart = {
    labels: Object.keys(revenueByEvent),
    datasets: [
      {
        label: 'Revenue by Event',
        data: Object.values(revenueByEvent),
        backgroundColor: 'rgba(255,159,64,0.6)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Sales Statistics</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
        <div className='m-4 p-4 border-2 rounded-sm'>
          <h3 className='text-xl font-semibold mb-2'>Total Revenue</h3>
          <div className='text-3xl font-bold text-green-600'>
            {totalRevenue.toFixed(3)}DT
          </div>
        </div>
        <div className='m-4 p-4 border-2 rounded-sm'>
          <h3 className='text-xl font-semibold mb-2'>Revenue Over Time</h3>
          <Line data={revenueChart} options={revenueChartOptions} />
        </div>
        <div className='m-4 p-4 border-2 rounded-sm'>
          <h3 className='text-xl font-semibold mb-2'>Tickets Sold by Event</h3>
          <Bar data={ticketsSoldChart} />
        </div>
        <div className='m-4 p-4 border-2 rounded-sm'>
          <h3 className='text-xl font-semibold mb-2'>Revenue by Event</h3>
          <Bar data={revenueByEventChart} />
        </div>
      </div>
    </div>
  );
};

export default SalesStatistics;
