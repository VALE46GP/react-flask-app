import React from 'react';
import Controls from '../Controls/Controls';
import { Container, Row, Col } from 'react-bootstrap'
import logo from '../../logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usageData: 0,
      monitorCPU: false,
    }
    this.toggleMonitorCPU = this.toggleMonitorCPU.bind(this);
  }

  componentDidMount () {
    const interval = setInterval(() => {
      const { monitorCPU } = this.state
      console.log('I come first')
      if (monitorCPU) {
        console.log('Here I am')
        fetch('/usage-data').then(res => res.json()).then(data => {
          if (data.usageData !== 0) {
            this.setState({
              usageData: data.usageData,
            })
          }
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }

  toggleMonitorCPU() {
    const { monitorCPU } = this.state;
    console.log('CLICK!');
    this.setState({
      monitorCPU: !monitorCPU,
    });
  };

  render() {
    const { monitorCPU, usageData } = this.state;
    return (
      <div className="App">
        <Container className="App-container">
          <Row>
            <Col>
              <img src={logo} className="App-logo" alt="logo"/>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Current CPU Usage = {usageData}%.</p>
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
