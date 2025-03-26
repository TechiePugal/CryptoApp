# 📊 Project Overview: CryptoApp

### 🎯 Objective
CryptoApp is a React-based web application that provides real-time data and historical price trends of cryptocurrencies, similar to [CoinMarketCap](https://coinmarketcap.com/). It fetches cryptocurrency data from the CoinGecko API and visualizes price trends using charts.

---

## 🔗 Live URL
👉 [CryptoApp Live URL](https://crypto-app-sigma-seven.vercel.app/)

## 🧰 GitHub Repository
👉 [GitHub Repository](https://github.com/TechiePugal/CryptoApp)

---

## 🚀 Key Features

1. Real-Time Cryptocurrency Data:
   - Fetches the latest market data for selected cryptocurrencies.
   - Displays essential information such as price, market cap, and volume.

2. Historical Price Data:
   - Retrieves the last 7 days’ price history of selected cryptocurrencies.
   - Visualizes data using interactive charts.

3. Dynamic Cryptocurrency Selection:
   - Allows users to switch between different cryptocurrencies and view relevant data.

4. Responsive Design:
   - Optimized for seamless performance across different devices.

---

## 🛠️ Project Structure

### 📁 Folder Structure
```
/CryptoApp
├── /public
├── /src
│   ├── /components
│   ├── /services
│   │   └── api.js
│   ├── /pages
│   ├── /styles
│   ├── /utils
│   ├── App.js
│   ├── index.js
└── package.json
```

---

## 🔌 API Integration (api.js)  
The API services are handled in `src/services/api.js` using `axios` for HTTP requests.

### 1. Fetching Real-Time Market Data
```javascript
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
```
- API Endpoint:  
  ```
  https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoCode}
  ```
- Purpose: Fetches the latest price, market cap, and volume of a cryptocurrency.
- Default Crypto: `bitcoin` if no parameter is passed.

---

### 2. Fetching Historical Price Data
```javascript
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
```
- API Endpoint:  
  ```
  https://api.coingecko.com/api/v3/coins/${cryptoCode}/market_chart?vs_currency=usd&days=7
  ```
- Purpose: Fetches historical price data for the past 7 days.
- Return Format: Array of price data points.

---

## 👆 Dependencies (package.json)

### 📚 Main Dependencies
```json
"dependencies": {
  "@testing-library/jest-dom": "^5.17.0",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^13.5.0",
  "axios": "^1.7.7",
  "chart.js": "^4.4.4",
  "react": "^18.3.1",
  "react-chartjs-2": "^5.2.0",
  "react-dom": "^18.3.1",
  "react-scripts": "5.0.1",
  "web-vitals": "^2.1.4"
}
```
- `axios` - For making HTTP requests.
- `chart.js` & `react-chartjs-2` - For visualizing price trends.
- `react` & `react-dom` - Core React libraries.
- `react-scripts` - For managing React build and development.

---

## 📄 Scripts in package.json
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```
- `start` - Launches the development server.
- `build` - Builds the app for production.
- `test` - Runs tests using Jest.
- `eject` - Ejects the app for advanced configuration.

---

## 🌐 Deployment (Vercel)
- The application is deployed using [Vercel](https://vercel.com/), providing a public URL for easy access.

---

## 📈 Data Flow Overview

1. User Input:
   - Selects a cryptocurrency.
   - Triggers an API call to fetch relevant data.

2. API Call:
   - `fetchCryptoData()` - Fetches real-time market data.
   - `fetchHistoricalData()` - Retrieves historical price trends.

3. Chart Rendering:
   - Displays historical price data using `react-chartjs-2`.

4. Data Display:
   - Dynamically updates UI with fetched data.

---

## 🎨 UI and UX
- Clean and minimalistic UI design.
- Smooth transition between different cryptocurrencies.
- Interactive charts for improved visualization.

---

## 📈 Possible Improvements
- Add a search bar to allow users to search for multiple cryptocurrencies.
- Integrate price alerts and notifications.
- Expand chart options to support different time ranges (1 month, 3 months, etc.).
- Include comparison charts between multiple cryptocurrencies.

---

## 🧮 Why CryptoApp is Similar to CoinMarketCap?
- Provides real-time market data and historical price trends.
- Offers easy navigation and selection of cryptocurrencies.
- Displays data in an intuitive and interactive format.

---

💚 Feel free to explore the live version and check out the GitHub repository for the source code! 😊

