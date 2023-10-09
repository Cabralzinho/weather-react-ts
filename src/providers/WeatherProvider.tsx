import { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";

type WeatherProviderProps = {
  children: React.ReactNode;
};

type CityWeather = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: "Clear" | "Clouds" | "Rain" | "Snow"
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type WeatherContextType = {
  cityWeather: CityWeather | null;
  citiesSearch: CityWeather[];
  weatherRequest: string[];
  requestLastMinute: number[];
  isCityWeatherLoading: boolean;
  setCityWeather: Dispatch<SetStateAction<CityWeather | null>>;
  setCitiesSearch: Dispatch<SetStateAction<CityWeather[]>>;
  setWeatherRequest: Dispatch<SetStateAction<string[]>>;
  setRequestLastMinute: Dispatch<SetStateAction<number[]>>;
  setIsCityWeatherLoading: Dispatch<SetStateAction<boolean>>;
};

export const WeatherContext = createContext<WeatherContextType>(
  {} as WeatherContextType
);

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [cityWeather, setCityWeather] = useState<CityWeather | null>(null);
  const [citiesSearch, setCitiesSearch] = useState<CityWeather[]>([]);
  const [weatherRequest, setWeatherRequest] = useState<string[]>([]);
  const [requestLastMinute, setRequestLastMinute] = useState<number[]>([]);
  const [isCityWeatherLoading, setIsCityWeatherLoading] =
    useState<boolean>(false);

  return (
    <WeatherContext.Provider
      value={{
        cityWeather,
        setCityWeather,
        citiesSearch,
        setCitiesSearch,
        weatherRequest,
        setWeatherRequest,
        requestLastMinute,
        setRequestLastMinute,
        isCityWeatherLoading,
        setIsCityWeatherLoading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
