import React from 'react';
import Chart from 'chart.js';
import classes from './GraphMemory.module.css';

class GraphMemory extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const ctx = this.chartRef.current.getContext('2d');
    // const formattedData = this.formatData(this.props.data);
    const { memoryAvailable, memoryTotal } = this.props.data.length
      ? this.props.data[this.props.data.length - 1]
      : [ 0, 0 ];
    const formattedData = [ memoryAvailable, memoryTotal - memoryAvailable ];
    this.chartMemory = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: formattedData,
        }],
        labels: [ 'Available', 'Used' ],
        backgroundColor: [
          "#029E5A",
          "#EB4C31",
        ]
      },
      options: {
      }
    });
    this.setState((props) => ({
      data: formattedData,
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const { memoryAvailable, memoryTotal } = this.props.data.length
        ? this.props.data[this.props.data.length - 1]
        : 0;
      const newData = [ memoryAvailable, memoryTotal - memoryAvailable ];
      this.setState((props) => ({
        data: newData,
      }));
      this.chartMemory.data.datasets[0].data = newData;
      this.chartMemory.update();
    }
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.graph}>
          <canvas
            id="chartMemory"
            ref={this.chartRef}
          />
        </div>
      </div>
    )
  }
}

export default GraphMemory;