import React from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import classes from './GraphCPU.module.scss';

class GraphCPU extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const ctx = this.chartRef.current.getContext('2d');
    const { data } = this.props;
    const formattedData = this.formatData(data);
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: '%',
          backgroundColor: '#002862',
          borderColor: '#007bff',
          color: '#007bff',
          data: [formattedData],
          // pointBackgroundColor: '#007bff',
        }],
      },
      options: {
        color: '#007bff',
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: 'CPU Usage',
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'linear',
            gridLines: {
              display: true,
              color: '#a4a4a4',
            },
            time: {
              displayFormats: {
                quarter: 'h:mm:ss a',
              },
              unit: 'second',
            },
          }],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: '#a4a4a4',
              },
              scaleLabel: {
                display: true,
                labelString: '%'
              },
              ticks: {
                min: 0,
              },
            },
          ],
        },
      },
    });
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      this.myChart.data.datasets[0].data = this.formatData(data);
      this.myChart.update();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  formatData(data = []) {
    const formatDate = (secs) => {
      const t = new Date(1970, 0, 1); // Epoch
      t.setSeconds(secs);
      return t;
    }
    return data.map((p) => ({
      x: formatDate(p.time),
      y: p.cpuPercent,
    }));
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.graph}>
          <canvas
            id="myChart"
            ref={this.chartRef}
          />
        </div>
      </div>
    )
  }
}

GraphCPU.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GraphCPU;
