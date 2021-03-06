import React from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import classes from './GraphMemory.module.scss';

class GraphMemory extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const ctx = this.chartRef.current.getContext('2d');
    const { data } = this.props;
    const { memoryAvailable, memoryTotal } = data.length
      ? data[data.length - 1]
      : {
        memoryAvailable: 0,
        memoryTotal: 0,
      };
    const formattedData = [memoryTotal - memoryAvailable, memoryAvailable];
    this.chartMemory = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: formattedData,
          backgroundColor: [
            '#002862',
            '#029E5A',
          ],
          borderColor: '#007bff',
        }],
        labels: ['Used', 'Available'],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Memory Usage',
        },
      },
    });
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      const { memoryAvailable, memoryTotal } = data.length
        ? data[data.length - 1]
        : {
          memoryAvailable: 0,
          memoryTotal: 0,
        };
      this.chartMemory.data.datasets[0].data = [memoryAvailable, memoryTotal - memoryAvailable];
      this.chartMemory.update();
    }
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.container_inner}>
          <div className={classes.graph}>
            <canvas
              id="chartMemory"
              ref={this.chartRef}
            />
          </div>
        </div>
      </div>
    )
  }
}

GraphMemory.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default GraphMemory;
