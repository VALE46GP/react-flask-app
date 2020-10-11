import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Controls from '../Controls/Controls';
import GraphCPU from '../GraphCPU/GraphCPU';
import GraphMemory from '../GraphMemory/GraphMemory';
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

  togglemonitor() {
    this.setState((state) => ({
      monitor: !state.monitor,
    }));
    this.fetchData();
  }

  fetchData() {
    const interval = setInterval(() => {
      const { monitor } = this.state;
      if (monitor) {
        fetch('/usage-data').then((res) => res.json()).then((data) => {
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

  componentDidMount() {
    fetch('/system-info').then((res) => res.json()).then((data) => {
      this.setState(() => ({
        systemInfo: data,
      }));
    });
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
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
