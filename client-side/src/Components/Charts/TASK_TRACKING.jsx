import React, { useEffect, useState } from 'react';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TaskCompletionChart = ({ tasks }) => {
  const processTaskData = (tasks) => {
    // Filter tasks that are completed
    const completedTasks = tasks.filter(task => task.status === 'approved'); // or your own completion status

    // Extract the dates from the `updated_at` field
    const completionDates = completedTasks.map(task => task.updated_at.split('T')[0]);

    // Count the number of tasks completed on each date
    const taskCountsByDate = completionDates.reduce((acc, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Sort the dates
    const sortedDates = Object.keys(taskCountsByDate).sort();

    return {
      labels: sortedDates,
      data: sortedDates.map(date => taskCountsByDate[date]),
    };
  };

  const { labels, data } = processTaskData(tasks);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Tasks Completed',
        data: data,
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Tasks',
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
        text: 'Task Completion Over Time',
      },
    },
  };

  return <div style={{width:'100%'}}><Line data={chartData} options={options} /></div>;
};
export default TaskCompletionChart;