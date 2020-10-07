import React from 'react';
import Chart from 'chart.js';
import classes from './Graph.module.css';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: {},
      data: {},
    }
  }

  chartRef = React.createRef();

  componentDidMount() {
    const data = this.formatData(this.props.usageData);
    const ctx = this.chartRef.current.getContext('2d')
    const cpuUsageChart = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              displayFormats: {
                quarter: 'h:mm:ss a'
              }
            }
          }]
        }
      }
    });
    this.setState((props) => ({
      chart: cpuUsageChart,
      data,
    }));
  }

  formatData(data = []) {
    return data.map((p) => ({
      x: p.time,
      y: p.cpuPercent,
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.usageData !== prevProps.usageData) {
      const newChart = this.state.chart;
      newChart.update();
      const newData = this.formatData(this.props.usageData)
      this.setState((props) => ({
        chart: newChart,
        data: newData,
      }));
    }
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

export default Graph;