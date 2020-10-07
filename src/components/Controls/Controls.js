import React from 'react';
import Button from 'react-bootstrap/Button'
import './Controls.css';

class Controls extends React.Component {
  render () {
    const { monitor, togglemonitor } = this.props;
    return (
      <div className="Controls">
        <Button
          variant={monitor ? "outline-danger" : "outline-primary"}
          onClick={togglemonitor}
        >{monitor ? "STOP" : "Monitor Hardware"}</Button>
      </div>
    );
  }
}

export default Controls;
