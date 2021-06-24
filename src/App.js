import React, { useState } from 'react';

const api = {
  key: "f9315227253b57788886f18215d2d269",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather,setWeather] = useState({});


  const search = evt =>{ 
    if( evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
          console.log(result);
        });
  }
}
  const dateBuilder = (d) => {
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
    "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  const sunrise=(d)=>{
  let unix_timestamp= weather.sys.sunrise
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();

  
  // Will display time in 10:30:23 format
  return ` ${hours}:${ minutes.substr(-2) }`
  }

  const sunset=(d)=>{
    let unix_timestamp= weather.sys.sunset
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
  
    
    // Will display time in 10:30:23 format
    return ` ${hours}:${ minutes.substr(-2) }`
    }

  return (
    <div className={
      (typeof weather.main != "undefined") 
        ? ((weather.main.temp > 16) 
          ? 'App warm' 
          : 'App cold') 
        : 'App '}>
      <main>
      <h1 class="heading"><i className="fa fa-cloud"></i> Weather App</h1>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="ENTER CITY"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
      
        {(typeof weather.main !=  "undefined") ? (
        <div className="main"> 
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>     
          <div className="weather-box">
            <div className="temp">
           <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="imgicon"/>
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
         </div>
 
         <div className="weather-info">
           <div className="wind">Max Temp : {weather.main.temp_max}&deg; C</div>
           <div className="wind">Min Temp : {weather.main.temp_min}&deg; C</div> 
           <div className="hum">Wind : {weather.wind.speed} MPH</div>
           <div className="hum">Humidity : {weather.main.humidity}%</div>
           <div className="wind">Sunrise : {sunrise(new Date())}</div> 
           <div className="wind">Senset : {sunset(new Date())}</div>

         </div>
         </div>
        ) : ('')}
      </main>
    </div>    
  );
};

export default App;