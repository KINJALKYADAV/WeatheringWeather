import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('');

  //const url = 'https://api.openweathermap.org/data/2.5/weather?q=${location}&appid={46e60ab8cc8fc58b867f517354e49c6c}'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
  const defurl = `https://api.openweathermap.org/data/2.5/weather?q=delhi&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
  
  const searchLocation = (event) => {

    if(!event)  return;
    toast.info(`Fetching weather for ${event}`)
    axios.get(url)
      .then((response) => {
        setData(response.data);
        toast.success(`Successfully fetched weather for ${event}`)
        //console.log(response.data)
      })
      .catch((err) => {
        toast.error(`${event} is not a valid location`);
      });
    setLocation("");

    /*if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }*/
  }
  useEffect(()=> {
    axios.get(defurl).then((response)=>{
      setData(response.data);
    });
  }, [defurl]);

  const search2 = () => {
    searchLocation(location);
  };

  const search1=(event)=> {
    if(event.key === "Enter"){
      searchLocation(location);
    }
  };
  /*
  const Cloud = (event)=>{
    switch (event.toLowerCase()){
      case "snow":
        return <BsCloudSnowFill />;       
      case "rain":
        return <BsFillCloudLightningRainFill />;
      case "fog":
        return <BsFillCloudFog2Fill />;
      case "clear":
        return <BsFillCloudSunFill />;
      case "clouds":
        return <BsCloudsFill />;
      case "haze":
        return <BsFillCloudHaze2Fill />;
      case "mist":
        return <BsFillCloudHaze2Fill />;
      default:
        return <BsCloudsFill />;
    }
  }*/
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event )=> setLocation(event.target.value)}
          onKeyPress ={search1}
          placeholder='Enter Location'
          type="text" 
          />
          <button type = "button" className='click' onClick={search2}>
            Search
          </button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{((data.main.temp-32)/1.8).toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name === undefined ? null : (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{((data.main.feels_like-32)/1.8).toFixed()}°C</p> : null}
              <p>Mood </p>
            </div>
            <div className="humidity">
              {(data.main ? <p className='bold'>{data.main.humidity}%</p> : null)
              }
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{(data.wind.speed*3.6).toFixed(2)} Km/h</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
      <ToastContainer autoClose = {4000} theme="colored" newestOnTop= {true}/>
    </div>
  );
}

export default App;