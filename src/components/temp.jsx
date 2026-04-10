import React, { useEffect, useState } from "react";
import "./style.css";
import TempCard from "./tempCard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("jodhpur");
  const [tempInfo, setTempInfo] = useState("");

  const getWeathernoIfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=e66a90626316a2adb94538d06095ca0a`;

      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunrise, sunset } = data.sys;

      const myNewWeatherObj = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunrise,
        sunset,
      };

      setTempInfo(myNewWeatherObj);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeathernoIfo();
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeathernoIfo}
          >
            Search
          </button>
        </div>
      </div>
      <TempCard tempInfo={tempInfo}></TempCard>
    </>
  );
};

export default Temp;
