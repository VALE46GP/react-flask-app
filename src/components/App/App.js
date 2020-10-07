import React from 'react';
import Controls from '../Controls/Controls';
import GraphCPU from '../GraphCPU/GraphCPU';
import GraphMemory from '../GraphMemory/GraphMemory';
import { Container, Row, Col } from 'react-bootstrap'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monitor: false,
      usageData: [],
    };
    this.togglemonitor = this.togglemonitor.bind(this);
  }

  togglemonitor() {
    this.setState((state) => ({
      monitor: !state.monitor,
    }));
    this.fetchData();
  };

  fetchData() {
    const interval = setInterval(() => {
      const { monitor } = this.state;
      if (monitor) {
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
    const { monitor, usageData } = this.state;
    return (
      <div className="App">
        <Container className="App-container">
          <Row>
            <Col>
              <GraphCPU data={usageData} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Controls monitor={monitor} togglemonitor={this.togglemonitor}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <GraphMemory data={usageData} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
