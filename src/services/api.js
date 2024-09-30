// src/services/api.js
import axios from 'axios';

export const fetchCryptoData = async (cryptoCode = 'bitcoin') => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoCode}`
    );
    return response.data[0]; // Access the first element in the array since the API returns an array
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const fetchHistoricalData = async (cryptoCode = 'bitcoin') => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${cryptoCode}/market_chart?vs_currency=usd&days=7`
    );
    return response.data.prices; // Return the prices array
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return null;
  }
};
