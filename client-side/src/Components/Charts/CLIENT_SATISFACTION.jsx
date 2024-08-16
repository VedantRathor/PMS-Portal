import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { color } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const processLogData = (projects) => {
    const logStatusByDate = {};
  
    projects.forEach(project => {
      project.tasks.forEach(task => {
        task.logs.forEach(log => {
          const date = log.updated_at.split('T')[0]; // Assuming log has a 'date' field
          const status = log.logstatus; // Assuming log has a 'status' field like 'approved', 'rejected', etc.
  
          if (!logStatusByDate[date]) {
            logStatusByDate[date] = { approved: 0, rejected: 0, pending: 0 };
          }
  
          if (status == 'approved') {
            logStatusByDate[date].approved += 1;
          } else if (status === 'rejected') {
            logStatusByDate[date].rejected += 1;
          } else if (status === 'pending') {
            logStatusByDate[date].pending += 1;
          }
        });
      });
    });
  
    const dates = Object.keys(logStatusByDate).sort();
  
    return {
      labels: dates,
      approvedData: dates.map(date => logStatusByDate[date].approved),
      rejectedData: dates.map(date => logStatusByDate[date].rejected),
      pendingData: dates.map(date => logStatusByDate[date].pending),
    };
  };

const ClientSatisfactionChart = ({ projects }) => {
  const { labels, approvedData, rejectedData, pendingData } = processLogData(projects);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Approved Logs',
        data: approvedData,
        fill: false,
        backgroundColor: 'green',
        borderColor: 'green',
      },
      {
        label: 'Rejected Logs',
        data: rejectedData,
        fill: false,
        backgroundColor: 'red',
        borderColor: 'red',
      },
      {
        label: 'Pending Logs',
        data: pendingData,
        fill: false,
        backgroundColor: 'orange',
        borderColor: 'orange',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Logs',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Client Satisfaction Over Time',
        color: 'white',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ClientSatisfactionChart;