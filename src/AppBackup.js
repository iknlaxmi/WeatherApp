import { useEffect, useState } from 'react';
import axios from 'axios';
// import red from '@material-ui/core/colors/red';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

import './App.css';
import { Today } from '@mui/icons-material';

function App() {
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
        `http://api.weatherapi.com/v1/forecast.json?key=de5c8fbc7ad043d788685120231002&q=${search_location}&days=6&aqi=no&alerts=no`
      )
      .then((res) => {
        console.log(res.data);

        console.log(res.data.current.condition.icon);
        setCurrentImage(res.data.current.condition.icon);
        setCurrentTemp(res.data.current.temp_c);
        setWeatherType(res.data.current.condition.text);
        setCurrentLocation(res.data.location.name);
        var date = new Date(res.data.forecast.forecastday[0].date);

        console.log(date.getDay());
        setDate_0(date);
      });
  }, [search_location]);
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/search.json?key=de5c8fbc7ad043d788685120231002&q=${search_location}`
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
  const heightInvh = {
    height: '100vh',
  };
  const height100p = {
    height: '100%',
  };
  const inputStyle = {
    width: '150px',
    margin: '10px',
    marginTop: '80px',
    // border: '1px solid gray',
    border: 'none',
  };

  return (
    <div className="App">
      <div
        className="current-box"
        style={showSearchBtn ? heightInvh : height100p}
      >
        {showSearchBtn && (
          <button className="btn-close" onClick={handleCloseBtnClick}>
            <CloseIcon />
          </button>
        )}

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
        {showSearch
          ? searchList.map((item) => {
              return (
                <li
                  className="li-citylist"
                  key={item.id}
                  onClick={() => handleSearchItem(item.name)}
                >
                  {item.name}
                </li>
              );
            })
          : null}
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
      <div className="forecast-box">Hello</div>
    </div>
  );
}

export default App;
