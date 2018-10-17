import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['isSent', 'isOpen', 'Coverage'],
  datasets: [
    {
      label: 'Total Coverage',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [2, 1, 0.5]
    },
    {
      hidden: true,
      label: 'Android Coverage',
      backgroundColor: 'rgba(152,251,152,0.2)',
      borderColor: 'rgba(152,251,152,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(152,251,152,0.4)',
      hoverBorderColor: 'rgba(152,251,152,1)',
      data: [1, 1, 1]
    },
    {
      hidden: true,
      label: 'IOS Coverage',
      backgroundColor: 'rgba(135,206,235,0.2)',
      borderColor: 'rgba(135,206,235,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(135,206,235,0.4)',
      hoverBorderColor: 'rgba(135,206,235,1)',
      data: [1, 0, 0]
    }
  ]
};

export default class BarChart extends React.Component {
  render() {
    return (
      <div>
        <h2>Bar Example (custom size)</h2>
        <Bar
          data={data}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
    );
  }
}