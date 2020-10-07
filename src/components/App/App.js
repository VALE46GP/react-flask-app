import React from 'react';
import Controls from '../Controls/Controls';
import Graph from '../Graph/Graph';
import { Container, Row, Col } from 'react-bootstrap'
// import logo from '../../logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monitorCPU: false,
      usageData: [],
      startTime: 0,
    };
    this.fetchData = this.fetchData.bind(this);
    this.formatUsageData = this.formatUsageData.bind(this);
    this.toggleMonitorCPU = this.toggleMonitorCPU.bind(this);
  }

  toggleMonitorCPU() {
    this.setState((state) => ({
      monitorCPU: !state.monitorCPU,
    }));
    this.fetchData();
  };

  fetchData() {
    const interval = setInterval(() => {
      const { monitorCPU } = this.state;
      if (monitorCPU) {
        fetch('/usage-data').then(res => res.json()).then(data => {
          if (data.cpuPercent !== 0) {
            this.setState((state) => ({
              usageData: [...state.usageData, this.formatUsageData(data)],
            }));
          }
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }

  // function addDataTo(chart, label, data) {
  //   chart.data.labels.push(label);
  //   chart.data.datasets.forEach((dataset) => {
  //     dataset.data.push(data);
  //   });
  //   chart.update();
  // }

  formatUsageData(data) {
    const { usageData } = this.state;
    return {
      ...data,
      secondsFromStart: usageData.length ? Math.trunc(data.time - usageData[0].time) : 0,
    }
  }

  render() {
    const { monitorCPU, usageData } = this.state;
    return (
      <div className="App">
        <Container className="App-container">
          <Row>
            <Col>
              {/*<img src={logo} className="App-logo" alt="logo"/>*/}
              <Graph usageData={usageData} />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{usageData.length ? 'Current CPU Usage = ' + usageData[usageData.length - 1].cpuPercent + '%.' : ''}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Controls monitorCPU={monitorCPU} toggleMonitorCPU={this.toggleMonitorCPU}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{'Data Points Collected = ' + usageData.length}</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
