import React from 'react';
import Controls from '../Controls/Controls';
import Graph from '../Graph/Graph';
import { Container, Row, Col } from 'react-bootstrap'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monitorCPU: false,
      usageData: [],
    };
    this.fetchData = this.fetchData.bind(this);
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
              usageData: [...state.usageData, data],
            }));
          }
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }

  render() {
    const { monitorCPU, usageData } = this.state;
    return (
      <div className="App">
        <Container className="App-container">
          <Row>
            <Col>
              <Graph data={usageData} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Controls monitorCPU={monitorCPU} toggleMonitorCPU={this.toggleMonitorCPU}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
