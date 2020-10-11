import React from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import classes from './GraphBattery.module.scss';

class GraphBattery extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const ctx = this.chartRef.current.getContext('2d');
    const { data } = this.props;
    const battery = data.length
      ? data[data.length - 1].battery
      : {
        percent: 0,
        secsleft: 0,
        charging: false,
      };
    const formattedData = data.length
      ? [battery.percent, 100 - battery.percent]
      : [0, 0];
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
          text: 'Battery',
        },
      },
    });
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      const { battery } = data.length
        ? data[data.length - 1]
        : {
          percent: 0,
          secsleft: 0,
          charging: false,
        };
      this.chartMemory.data.datasets[0].data = [100 - battery.percent, battery.percent];
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

GraphBattery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default GraphBattery;
