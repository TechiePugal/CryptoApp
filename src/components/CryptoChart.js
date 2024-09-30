import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { debounce } from 'lodash';
import { fetchCryptoData, fetchHistoricalData } from '../services/api';
import './CryptoChart.css';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const CryptoChart = () => {
  const [cryptoData, setCryptoData] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [dateOptions, setDateOptions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('bitcoin'); // Default to Bitcoin

  const historicalCache = {}; // Cache for historical data

  const fetchData = async (coin) => {
    try {
      const data = await fetchCryptoData(coin);
      setCryptoData(data);

      if (!historicalCache[coin]) {
        const historicalPrices = await fetchHistoricalData(coin);
        historicalCache[coin] = historicalPrices; // Cache the data
        prepareChartData(historicalPrices);
      } else {
        prepareChartData(historicalCache[coin]); // Use cached data
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const debouncedFetchData = debounce(fetchData, 300);

  useEffect(() => {
    debouncedFetchData(selectedCoin);
    return () => {
      debouncedFetchData.cancel(); // Cleanup on unmount
    };
  }, [selectedCoin]);

  const prepareChartData = (data) => {
    const dailyPrices = {};
    const uniqueDates = new Set();

    data.forEach((point) => {
      const date = new Date(point[0]);
      const dateString = date.toLocaleDateString();
      uniqueDates.add(dateString);

      if (!dailyPrices[dateString]) {
        dailyPrices[dateString] = { high: point[1], low: point[1] };
      } else {
        dailyPrices[dateString].high = Math.max(dailyPrices[dateString].high, point[1]);
        dailyPrices[dateString].low = Math.min(dailyPrices[dateString].low, point[1]);
      }
    });

    setDateOptions(Array.from(uniqueDates));
    const dailyArray = Object.entries(dailyPrices).map(([date, { high, low }]) => ({
      date,
      high,
      low,
    }));

    setDailyData(dailyArray);
    setChartData(createChartData(dailyArray));
  };

  const createChartData = (dailyArray) => {
    const timestamps = dailyArray.map(item => item.date);
    const highPrices = dailyArray.map(item => item.high);
    const lowPrices = dailyArray.map(item => item.low);

    return {
      labels: timestamps,
      datasets: [
        {
          label: '📈 Highest Price (USD)',
          data: highPrices,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1,
        },
        {
          label: '📉 Lowest Price (USD)',
          data: lowPrices,
          backgroundColor: 'rgba(255,99,132,0.6)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const handleFilter = () => {
    if (startDate && endDate) {
      const filteredData = dailyData.filter(item => {
        return item.date >= startDate && item.date <= endDate;
      });

      setChartData(createChartData(filteredData));
      setDailyData(filteredData);
    } else {
      alert('⚠️ Please select both start and end dates to filter.');
    }
  };

  return (
    <div className="crypto-chart-container">
      <h1>Crypto Analyzer</h1>
      <center><h4>Take Last 7 Days Price Trend Over Time & Daily Price Comparison</h4></center>

      {/* Coin Selection Dropdown */}
      <div className="coin-selection">
        <label htmlFor="coin-select" className="select-crypto-label"></label>
        <select
          id="coin-select"
          className="select-crypto"
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
        >
          <option value="bitcoin">Bitcoin (BTC)</option>
          <option value="ethereum">Ethereum (ETH)</option>
          <option value="litecoin">Litecoin (LTC)</option>
          <option value="ripple">Ripple (XRP)</option>
          <option value="cardano">Cardano (ADA)</option>
          <option value="polkadot">Polkadot (DOT)</option>
          <option value="stellar">Stellar (XLM)</option>
          <option value="chainlink">Chainlink (LINK)</option>
          <option value="dogecoin">Dogecoin (DOGE)</option>
          <option value="binancecoin">Binance Coin (BNB)</option>
        </select>
      </div>

      {cryptoData ? (
        <div className="crypto-info">
          <h2>{cryptoData.name} ({cryptoData.symbol.toUpperCase()})</h2>

          <div className="crypto-stats">
            <p>Current Price: <span className="price">${cryptoData.current_price.toFixed(2)}</span></p>
            <p>Market Cap: <span className="market-cap">${cryptoData.market_cap.toLocaleString()}</span></p>
            <p>Volume: <span className="volume">${cryptoData.total_volume.toLocaleString()}</span></p>
          </div>

          <div className="date-filter">
            <label htmlFor="start-date">Select Start Date:</label>
            <select
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            >
              <option value="">Choose Start Date</option>
              {dateOptions.map((date, index) => (
                <option key={index} value={date}>{date}</option>
              ))}
            </select>

            <label htmlFor="end-date">Select End Date:</label>
            <select
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            >
              <option value="">Choose End Date</option>
              {dateOptions.map((date, index) => (
                <option key={index} value={date}>{date}</option>
              ))}
            </select>

            <button onClick={handleFilter}>🔍 Filter</button>
          </div>

          <h3>Price Trends in Selected Date Range</h3>
          <table className="price-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Highest Price (USD)</th>
                <th>Lowest Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {dailyData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>${item.high.toFixed(2)}</td>
                  <td>${item.low.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="chart-container">
            <div className="chart">
              <h4>📊 Price Trend Over Time</h4>
              {chartData ? (
                <Line data={chartData} />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>

            <div className="chart">
              <h4>📉 Daily Price Comparison</h4>
              {chartData ? (
                <Bar data={{
                  labels: dailyData.map(item => item.date),
                  datasets: [
                    {
                      label: 'Highest Price (USD)',
                      data: dailyData.map(item => item.high),
                      backgroundColor: 'rgba(75,192,192,0.6)',
                    },
                    {
                      label: 'Lowest Price (USD)',
                      data: dailyData.map(item => item.low),
                      backgroundColor: 'rgba(255,99,132,0.6)',
                    },
                  ],
                }} />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}

      {/* Footer Section */}
      <footer className="crypto-chart-footer">
        <p>© TechiePugal 2024. All rights reserved.</p>
        <p>Contact me on <a href="https://www.linkedin.com/in/techiepugal-in-090135272" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
      </footer>
    </div>
  );
};

export default CryptoChart;
