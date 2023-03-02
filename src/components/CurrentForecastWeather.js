import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { FaLocationArrow } from 'react-icons/fa';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import '../styles/CurrentWeather.css';

const CurrentForecastWeather = () => {
  const [currrentImg, setCurrentImage] = useState('10d');
  const [currentTemp, setCurrentTemp] = useState(0);
  const [weatherType, setWeatherType] = useState('');
  const [date_0, setDate_0] = useState(new Date());
  const [searchBtnPres, setSearchBtnPres] = useState(false);
  const [search_location, setSearchLocation] = useState('Bangalore');
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [selected_location, setSelectedLocation] = useState('Bangalore');
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [showSearchBtn, setShowSearchBtn] = useState(false);

  //****************Forecast setState */
  const [degData, setDegData] = useState(true);
  const [windStatus, setWindStatus] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [airPressure, setAirPressure] = useState(0);
  const [windDeg, setWindDeg] = useState(0);
  const [windDir, setWindDir] = useState('N');
  const [forecastData, setForecastData] = useState([
    {
      id: '1',
      forecast_date: new Date(),
      weather_type: '10d',
      mintemp_c: 10,
      mintemp_f: 10,
      maxtemp_c: 40,
      maxtemp_f: 40,
    },
    {
      id: '2',
      forecast_date: new Date(),
      weather_type: '10d',
      mintemp_c: 10,
      mintemp_f: 10,
      maxtemp_c: 40,
      maxtemp_f: 40,
    },
    {
      id: '3',
      forecast_date: new Date(),
      weather_type: '10d',
      mintemp_c: 10,
      mintemp_f: 10,
      maxtemp_c: 40,
      maxtemp_f: 40,
    },
    {
      id: '4',
      forecast_date: new Date(),
      weather_type: '10d',
      mintemp_c: 10,
      mintemp_f: 10,
      maxtemp_c: 40,
      maxtemp_f: 40,
    },
    {
      id: '5',
      forecast_date: new Date(),
      weather_type: '10d',
      mintemp_c: 10,
      mintemp_f: 10,
      maxtemp_c: 40,
      maxtemp_f: 40,
    },
  ]);
  let compassSector = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
    'N',
  ];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  //Get cities with given search string
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${search_location}&limit=5&appid=cabe83207bc8ff5681c118c525e4048d`
      )
      .then((res) => {
        console.log('search');
        console.log(res.data);
        setSearchList(res.data);
      });
  }, [search_location]);
  //Get latitude,longitude with given city name
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${selected_location}&limit=5&appid=cabe83207bc8ff5681c118c525e4048d`
      )
      .then((res) => {
        console.log('lat data');
        console.log(res.data);
        setLatitude(res.data[0].lat);
        setLongitude(res.data[0].lon);
        setCurrentLocation(res.data[0].name);
      });
  }, [selected_location]);
  //Get forecast and current weather data from API call
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=alerts&appid=cabe83207bc8ff5681c118c525e4048d`
      )
      .then((res) => {
        console.log(res.data);
        setCurrentImage(res.data.current.weather[0].icon);
        console.log('Icon');
        console.log(res.data.current.weather[0].icon);

        setCurrentTemp(Math.trunc(res.data.current.temp));
        setWeatherType(res.data.current.weather[0].main);
        setWindStatus(res.data.current.wind_speed);
        setAirPressure(res.data.current.pressure);
        setHumidity(res.data.current.humidity);
        setVisibility(res.data.current.visibility / 1000);
        setWindDeg(-45 + res.data.current.wind_deg);
        setWindDir(
          compassSector[(res.data.current.wind_deg / 22.5).toFixed(0)]
        );
        let date = new Date(res.data.current.dt * 1000);
        setDate_0(date);
        let temp = [...forecastData];
        for (let i = 0; i < 5; i++) {
          temp[i].forecast_date = new Date(res.data.daily[i + 1].dt * 1000);
          temp[i].weather_type = res.data.daily[i + 1].weather[0].icon;
          temp[i].mintemp_c = Math.trunc(res.data.daily[i + 1].temp.min);
          temp[i].mintemp_f = Math.trunc(
            res.data.daily[i + 1].temp.min * 1.8 + 32
          );
          temp[i].maxtemp_c = Math.trunc(res.data.daily[i + 1].temp.max);
          temp[i].maxtemp_f = Math.trunc(
            res.data.daily[i + 1].temp.max * 1.8 + 32
          );
        }
        console.log(temp);
        setForecastData(temp);
      });
  }, [latitude, longitude]);

  //Search input
  const handleChange = (event) => {
    console.log('hi');
    setSearchLocation(event.target.value);
    setSearch(event.target.value);
  };
  const handleClick = () => {
    setSearchBtnPres(true);
    setShowSearch(true);
  };
  const handleSearchItem = (location) => {
    console.log(location);
    setSearchLocation(location);
    setSelectedLocation(location);
    setShowSearch(false);
    setShowSearchBtn(false);
    setSearch('');
  };
  const getLocation = () => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation.getCurrentPosition(showLocation));
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };
  const showLocation = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  const handleSearchBtn = () => {
    setShowSearchBtn(true);
  };
  const handleCloseBtnClick = () => {
    setShowSearchBtn(false);
    setSearchLocation('');
    setShowSearch(false);
    setShowSearchBtn(false);
    setSearch('');
  };

  const inputStyle = {
    width: '150px',
    margin: '10px',
    marginTop: '80px',
    // border: '1px solid gray',
    border: 'none',
  };
  const btnBg = {
    backgroundColor: 'white',
    color: 'black',
  };

  return (
    //
    <div className="row">
      <div className="col1 current-box">
        {showSearchBtn ? (
          <button className="btn-close" onClick={handleCloseBtnClick}>
            <CloseIcon />
          </button>
        ) : null}

        <input
          type="text"
          className="input-serach"
          placeholder={
            showSearchBtn ? '🔍Search Location' : 'Search for places'
          }
          onClick={() => {
            setShowSearchBtn(true);
          }}
          value={search}
          style={showSearchBtn ? inputStyle : null}
          onChange={handleChange}
        />
        {showSearchBtn && (
          <button className="btn-search" onClick={handleClick}>
            Search
          </button>
        )}
        {!showSearchBtn && (
          <button className="btn-gps" onClick={getLocation}>
            <GpsFixedIcon />
          </button>
        )}
        {showSearch &&
          searchList.map((item) => {
            return (
              <li
                className="li-citylist"
                key={item.id}
                onClick={() => handleSearchItem(item.name)}
              >
                {item.name}
              </li>
            );
          })}
        {!showSearchBtn && !showSearch ? (
          <div className="div-weather">
            <div className="flex-item">
              <img
                className="imag-weather-type"
                src={`http://openweathermap.org/img/wn/${currrentImg}@4x.png`}
                alt="weather"
              />
            </div>
            <div className="flex-item">
              <h3 className="h3-temp">{currentTemp}</h3>
              <h3 className="h3-deg">&deg;C</h3>
            </div>
            <div className="div-weathertype flex-item">
              <p className="p-weathertype">{weatherType}</p>
            </div>
            <div className="div-dayinfo flex-item">
              {' '}
              <p className="p-day">
                <span className="span-today">Today</span>
                <span className="span-dot">.</span>
                <span className="span-day">{days[date_0.getDay()]},</span>
                <span className="span-date">{date_0.getDate()}</span>
                <span className="span-month">{months[date_0.getMonth()]}</span>
              </p>
            </div>
            <div className="div-location flex-item">
              <span className="span-location-icon">
                {' '}
                <LocationOnIcon />
              </span>
              <span className="span-location-name"> {currentLocation}</span>
            </div>
          </div>
        ) : null}
      </div>
      <div className="col2 forecast-box">
        <button
          className="btn-temp"
          style={!degData ? btnBg : null}
          onClick={() => setDegData(false)}
        >
          &deg;F
        </button>
        <button
          className="btn-temp"
          style={degData ? btnBg : null}
          onClick={() => setDegData(true)}
        >
          &deg;C
        </button>
        <div className="container">
          {forecastData.map((item) => {
            return (
              <div className="forecast-item">
                {item.id === '1' ? (
                  <span className="span-tomorrow">Tomorrow</span>
                ) : (
                  <>
                    <span className="span-day-forecast">
                      {days[item.forecast_date.getDay()]},
                    </span>
                    <span className="span-date-forecast">
                      {item.forecast_date.getDate()}
                    </span>
                    <span className="span-month-forecast">
                      {months[item.forecast_date.getMonth()]}
                    </span>
                  </>
                )}
                <img
                  className="forecast-img"
                  src={`http://openweathermap.org/img/wn/${item.weather_type}@2x.png`}
                  alt="weather"
                />

                {degData ? (
                  <div className="forecast-temp-container">
                    <div className="forecast-temp-max">
                      <span>{item.maxtemp_c}&deg;C</span>
                    </div>
                    <div className="forecast-temp-min">
                      <span className="tempmin"> {item.mintemp_c}&deg;C</span>
                    </div>
                  </div>
                ) : (
                  <div className="forecast-temp-container">
                    <div className="forecast-temp-max">
                      <span>{item.maxtemp_f}&deg;F</span>
                    </div>
                    <div className="forecast-temp-min">
                      <span className="tempmin"> {item.mintemp_f}&deg;F</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <h2 className="h2-todayhighlights">Today's Hightlights</h2>
        <div className="container-hightlights">
          <div className="container-hightlights-item">
            <p className="h4-windstatus">Wind Status</p>
            <p className="h4-windstatus-value">
              {windStatus}
              <span className="mph">mps</span>
            </p>
            <div className="wind-dir">
              <div className="wind-arrow">
                <FaLocationArrow
                  size={15}
                  style={{ transform: `rotate(${windDeg}deg)` }}
                />
              </div>
              <span className="p-winddir">{windDir}</span>
            </div>
          </div>
          <div className="container-hightlights-item">
            <h3 className="h3-humidity">Humidity</h3>
            <h3 className="h3-humidity-val">
              {humidity}
              <span className="span-percent-symbol">%</span>
            </h3>
            <div className="div-pbar-label">
              <p className="p-progressbar1">0</p>
              <p className="p-progressbar2">50</p>
              <p className="p-progressbar3">100</p>
            </div>

            <progress
              className="progress-bar"
              max="100"
              value={humidity}
            ></progress>
            <div className="div-pbar-percent">
              <div className="div-percent-item">%</div>
            </div>
          </div>
          <div className="container-hightlights-item">
            <h3 className="h3-visibility">Visibility</h3>
            <h3 className="h3-visibility-val">
              {visibility}
              <span className="span-visibility-unit">Km</span>
            </h3>
          </div>
          <div className="container-hightlights-item">
            <h3 className="h3-airpressure">Air Pressure</h3>
            <h3 className="h3-airpressure-val">
              {airPressure}
              <span className="span-airpressure-unit">mb</span>
            </h3>
          </div>
        </div>
        <footer className="footer">
          Created by Nagalakshmi - devChallenges.io
        </footer>
      </div>
    </div>
  );
};

export default CurrentForecastWeather;
