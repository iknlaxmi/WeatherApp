import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CiLocationArrow1 } from 'react-icons/ci';
import { TfiLocationArrow } from 'react-icons/tfi';
import { FaLocationArrow } from 'react-icons/fa';
// import red from '@material-ui/core/colors/red';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import '../styles/CurrentWeather.css';

import { Today } from '@mui/icons-material';
import ForecastWeather from './ForecastWeather';

const CurrentWeather = () => {
  const [currrentImg, setCurrentImage] = useState('');
  const [currentTemp, setCurrentTemp] = useState(0);
  const [weatherType, setWeatherType] = useState('');
  const [date_0, setDate_0] = useState(new Date());
  const [searchBtnPres, setSearchBtnPres] = useState(false);
  const [search_location, setSearchLocation] = useState('Bangalore');
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [apiWeatherData, setApiWeatherData] = useState([]);
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
      weather_type: '',
      mintemp_c: 10,
      mintemp_f: 10,
      maxtemp_c: 40,
      maxtemp_f: 40,
    },
    {
      id: '2',
      forecast_date: new Date(),
      weather_type: '',
      mintemp_c: 10,
      mintemp_f: 10,
      maxtemp_c: 40,
      maxtemp_f: 40,
    },
    {
      id: '3',
      forecast_date: new Date(),
      weather_type: '',
      mintemp_c: 10,
      mintemp_f: 10,
      maxtemp_c: 40,
      maxtemp_f: 40,
    },
    {
      id: '4',
      forecast_date: new Date(),
      weather_type: '',
      mintemp_c: 10,
      mintemp_f: 10,
      maxtemp_c: 40,
      maxtemp_f: 40,
    },
    {
      id: '5',
      forecast_date: new Date(),
      weather_type: '',
      mintemp_c: 10,
      mintemp_f: 10,
      maxtemp_c: 40,
      maxtemp_f: 40,
    },
  ]);

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
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=ee82b7dc74634496a89115803232702&q=${search_location}&days=6&aqi=no&alerts=no`
      )
      .then((res) => {
        console.log(res.data);

        setApiWeatherData(res.data.forecast.forecastday);

        console.log(res.data.current.condition.icon);
        setCurrentImage(res.data.current.condition.icon);
        setCurrentTemp(res.data.current.temp_c);
        setWeatherType(res.data.current.condition.text);
        setCurrentLocation(res.data.location.name);
        setWindStatus(res.data.current.wind_mph);
        setAirPressure(res.data.current.pressure_mb);
        setHumidity(res.data.current.humidity);
        setVisibility(res.data.current.vis_miles);
        setWindDeg(-45 + res.data.current.wind_degree);
        setWindDir(res.data.current.wind_dir);
        let date = new Date(res.data.forecast.forecastday[0].date);

        console.log(date.getDay());
        setDate_0(date);

        let temp = [...forecastData];
        // console.log(temp);
        let j = 0;
        console.log(res.data.forecast.forecastday[0]);
        for (let i = 0; i < 5; i++) {
          // let date = new Date(res.data.forecast.forecastday[i+1].date);
          j = i;
          if (i >= 3) {
            j = 2;
          }
          temp[i].forecast_date = new Date(
            res.data.forecast.forecastday[j].date
          );
          temp[i].weather_type =
            res.data.forecast.forecastday[j].day.condition.icon;
          temp[i].mintemp_c = res.data.forecast.forecastday[j].day.mintemp_c;
          temp[i].mintemp_f = res.data.forecast.forecastday[j].day.mintemp_f;
          temp[i].maxtemp_c = res.data.forecast.forecastday[j].day.maxtemp_c;
          temp[i].maxtemp_f = res.data.forecast.forecastday[j].day.maxtemp_f;
        }
        console.log(temp);
        setForecastData(temp);
      });
  }, [search_location]);
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/search.json?key=ee82b7dc74634496a89115803232702&q=${search_location}`
      )
      .then((res) => {
        console.log(res.data);

        setSearchList(res.data);
      });
  }, [search_location]);

  useEffect(() => {
    axios
      .get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      )
      .then((res) => {
        console.log(res.data);
        setSearchLocation(res.data.city);
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
  const progressBarLabel1 = {
    width: '50%',
    dataValue: '0',
  };
  const progressBarLabel2 = {
    width: '100%',
    // dataValue: '80',
  };
  const progressBarLabel3 = {
    width: '150%',
    // dataValue: '80',
  };
  const pBarSpan = {
    width: '100%',
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
                src={currrentImg}
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
                <span className="span-day-forecast">
                  {days[item.forecast_date.getDay()]},
                </span>
                <span className="span-date-forecast">
                  {item.forecast_date.getDate()}
                </span>
                <span className="span-month-forecast">
                  {months[item.forecast_date.getMonth()]}
                </span>
                <img
                  className="forecast-img"
                  src={item.weather_type}
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
              <span className="mph">mph</span>
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
              <span className="span-visibility-unit">miles</span>
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

export default CurrentWeather;
