import React, { useState } from 'react';

function Dashboard() {
    const [stockName, setStockName] = useState('');
    const [targetPrice, setTargetPrice] = useState('');
    const [submittedData, setSubmittedData] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData({ stockName, targetPrice });
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Stock Name"
                    value={stockName}
                    onChange={(e) => setStockName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Target Price"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            {submittedData && (
                <div className="result">
                    <h3>Submitted Data:</h3>
                    <p>Stock Name: {submittedData.stockName}</p>
                    <p>Target Price: {submittedData.targetPrice}</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
