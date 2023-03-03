import React from 'react';
import CurrentForecastWeather from './components/CurrentForecastWeather';
// console.log(process.env.REACT_APP_API_KEY);
function App() {
  return (
    <div className="App">
      <CurrentForecastWeather />
    </div>
  );
}

export default App;
