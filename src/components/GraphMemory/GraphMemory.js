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
      : [0, 0];
    const formattedData = [memoryAvailable, memoryTotal - memoryAvailable];
    this.chartMemory = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: formattedData,
          backgroundColor: [
            '#029E5A',
            '#EB4C31',
          ],
        }],
        labels: ['Available', 'Used'],
      },
      options: {
      },
    });
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      const { memoryAvailable, memoryTotal } = data.length
        ? data[data.length - 1]
        : 0;
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
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GraphMemory;
