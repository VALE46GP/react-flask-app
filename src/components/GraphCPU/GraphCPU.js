import React from 'react';
import Chart from 'chart.js';
import classes from './GraphCPU.module.css';

class GraphCPU extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const ctx = this.chartRef.current.getContext('2d')
    const formattedData = this.formatData(this.props.data);
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [formattedData]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'linear',
            time: {
              displayFormats: {
                quarter: 'h:mm:ss a'
              },
              unit: 'second'
            }
          }],
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        }
      }
    });
    this.setState((props) => ({
      data: formattedData,
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const newData = this.formatData(this.props.data)
      this.setState((props) => ({
        data: newData,
      }));
      this.myChart.data.datasets[0].data = newData;
      this.myChart.update();
    }
  }

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

export default GraphCPU;