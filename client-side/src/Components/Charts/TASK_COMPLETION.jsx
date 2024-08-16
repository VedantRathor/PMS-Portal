

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TASK_COMPLETION = ({ pendingTasks, completedTasks }) => {
  const totalTasks = pendingTasks + completedTasks;

  const data = {
    labels: ['Pending', 'Completed', 'Total'],
    datasets: [
      {
        label: 'Tasks',
        data: [pendingTasks, completedTasks, totalTasks],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <div style={{width:'100%'}}><Bar data={data} options={options} /></div>;
};

export default TASK_COMPLETION;
