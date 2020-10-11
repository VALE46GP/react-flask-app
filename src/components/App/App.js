import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Controls from '../Controls/Controls';
import GraphCPU from '../GraphCPU/GraphCPU';
import GraphMemory from '../GraphMemory/GraphMemory';
import GraphBattery from '../GraphBattery/GraphBattery';
import TableInfo from '../TableInfo/TableInfo';
import classes from './App.module.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monitor: false,
      usageData: [],
      systemInfo: {},
    };
    this.togglemonitor = this.togglemonitor.bind(this);
  }

  componentDidMount() {
    fetch('/system-info').then((res) => res.json()).then((data) => {
      const newData = { clientTime: new Date(), ...data };
      this.setState(() => ({
        systemInfo: newData,
      }));
    });
  }

  fetchData() {
    const interval = setInterval(() => {
      const { monitor } = this.state;
      if (monitor) {
        fetch('/usage-data').then((res) => res.json()).then((data) => {
          if (data.cpuPercent > 0.5) {
            const newData = { clientTime: new Date(), ...data };
            this.setState((state) => ({
              usageData: [...state.usageData, newData],
            }));
          }
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }

  togglemonitor() {
    this.setState((state) => ({
      monitor: !state.monitor,
    }));
    this.fetchData();
  }

  render() {
    const { monitor, usageData, systemInfo } = this.state;
    return (
      <div className={classes.App}>
        <Container className={classes['App-container']}>
          <Row>
            <Col>
              <GraphCPU data={usageData} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Controls monitor={monitor} togglemonitor={this.togglemonitor} />
            </Col>
          </Row>
          <Row>
            <Col>
              <GraphMemory data={usageData} />
            </Col>
            <Col>
              <TableInfo systemInfo={systemInfo} />
            </Col>
            <Col>
              <GraphBattery data={usageData} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
