import React from 'react';
import Button from 'react-bootstrap/Button'
import './Controls.css';

class Controls extends React.Component {
  render () {
    const { monitorCPU, toggleMonitorCPU } = this.props;
    return (
      <div className="Controls">
        <Button
          variant={monitorCPU ? "outline-danger" : "outline-primary"}
          onClick={toggleMonitorCPU}
        >{monitorCPU ? "STOP" : "Monitor CPU"}</Button>
      </div>
    );
  }
}

export default Controls;
