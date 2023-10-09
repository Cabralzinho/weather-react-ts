import { useContext } from "react";
import { apiKey } from "../constants/apiKey";
import { WeatherContext } from "../providers/WeatherProvider";

type City = {
  city: string;
  lat: number;
  lon: number;
};

export const useWeather = () => {
  const {
    setCitiesSearch,
    citiesSearch,
    setRequestLastMinute,
    cityWeather,
    setCityWeather,
    isCityWeatherLoading,
    setIsCityWeatherLoading,
  } = useContext(WeatherContext);

  const updateRequestLastMinute = () => {
    setRequestLastMinute((prevRequestsLastMinute: any) => {
      const requestsLastMinuteCopyUpdated = prevRequestsLastMinute.filter(
        (prevRequestLastMinute: any) => {
          return prevRequestLastMinute.date < 60 * 1000;
        }
      );

      return [...requestsLastMinuteCopyUpdated, { date: Date.now() }];
    });
  };

  const searchCitiesByName = async (cityName: string) => {
    const limit = 5;

    updateRequestLastMinute();

    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`
    );

    if (response.status === 400) {
      setCitiesSearch([]);
      return;
    }

    const cities = await response.json();

    setCitiesSearch(cities);
  };

  const searchCityWeather = async (city: City) => {
    setCityWeather(null);

    setIsCityWeatherLoading(true);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`
    );

    const weather = await response.json();

    setIsCityWeatherLoading(false);
    setCityWeather(weather);
  };

  return {
    searchCitiesByName,
    citiesSearch,
    searchCityWeather,
    cityWeather,
    isCityWeatherLoading,
  };
};
