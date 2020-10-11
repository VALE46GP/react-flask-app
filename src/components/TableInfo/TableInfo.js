import React from 'react';
import Table from 'react-bootstrap/Table'
import PropTypes from 'prop-types';
import classes from './TableInfo.module.scss';

const TableInfo = (props) => {
  const { systemInfo } = props;
  const {
    cpuCount,
    cpuMexFreq,
    diskSpaceTotal,
    memoryTotal,
  } = systemInfo;

  return (
    <div className={classes.container}>
      <div className={classes.container_inner}>
        <div className={classes.table}>
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <td>CPU Count</td>
                <td>{ cpuCount }</td>
              </tr>
              <tr>
                <td>CPU Max Frequency</td>
                <td>{ cpuMexFreq }</td>
              </tr>
              <tr>
                <td>RAM Memory</td>
                <td>{ memoryTotal }</td>
              </tr>
              <tr>
                <td>Total Disk Space</td>
                <td>{ diskSpaceTotal }</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

TableInfo.propTypes = {
  systemInfo: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TableInfo;
