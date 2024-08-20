import React from'react';
import { Bar } from'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DIALOG_CHART = ({ approvedCount, rejectedCount, pendingCount ,name}) => {
  // Data for the chart
  console.log('asdf>>>>',approvedCount,rejectedCount,pendingCount);
  const data = {
    labels: ['Approved', 'Rejected', 'Pending'],
    datasets: [
      {
        label: 'Counts',
        data: [approvedCount, rejectedCount, pendingCount],
        backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
        borderColor: ['#388e3c', '#d32f2f', '#f57c00'],
        borderWidth: 1,
      },
    ],
  };

  // Options for the chartc
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return`${context.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{position: 'absolute',
        bottom: '20%',
        left: '97%',
        padding: '10px',
        zIndex:1000,
        color : 'white',
        // borderRadius: '5px',
        // boxShadow: '0px0px10pxrgba(0, 0, 0, 0.1)',
      }}
      className="dialogchartestimation"
    ><h4>Performance</h4><Bar data={data} options={options} /></div>
  );
};

export default  DIALOG_CHART;
