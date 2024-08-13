// frontend/src/components/Dashboard.js
import React, { useState } from 'react';

function Dashboard() {
  const [scriptName, setScriptName] = useState('');
  const [targetValue, setTargetValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    try {
      const response = await fetch('/api/stockTargets/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ scriptName, targetValue })
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Stock target added:', result);
      } else {
        console.error('Error:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Script Name:
          <input
            type="text"
            value={scriptName}
            onChange={(e) => setScriptName(e.target.value)}
          />
        </label>
        <label>
          Target Value:
          <input
            type="number"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Dashboard;
