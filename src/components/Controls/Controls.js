import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import './Controls.css';

const Controls = (props) => {
  const { monitor, togglemonitor } = props;
  return (
    <div className="Controls">
      <Button
        variant={monitor ? 'outline-danger' : 'outline-primary'}
        onClick={togglemonitor}
      >
        {monitor ? 'STOP' : 'Monitor Hardware'}
      </Button>
    </div>
  );
}

Controls.propTypes = {
  monitor: PropTypes.bool.isRequired,
  togglemonitor: PropTypes.func.isRequired,
};

export default Controls;
