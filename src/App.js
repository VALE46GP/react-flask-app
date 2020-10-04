import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [usageData, setUsageData] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/usage-data').then(res => res.json()).then(data => {
        setUsageData(data.usageData);
      });
    }, 1000);
    return () => clearInterval(interval);
    // fetch('/usage-data').then(res => res.json()).then(data => {
    //   setUsageData(data.usageData);
    // });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Current CPU Usage = {usageData}%.</p>
      </header>
    </div>
  );
}

export default App;
