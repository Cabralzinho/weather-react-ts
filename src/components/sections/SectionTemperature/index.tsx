import { convertKelvinToCelsius } from "../../../helpers/convertKelvinToCelsius";
import { useWeather } from "../../../hooks/useWeather"
import { Icons } from "../../Icons"

export const SectionTemperature = () => {
  const { cityWeather, isCityWeatherLoading } = useWeather();

  const weatherIcons = {
    Clear: "./ilustrator/sunLight.svg",
    Clouds: "./ilustrator/cloudFull.svg",
    Rain: "./ilustrator/rain.svg",
    Snow: "./ilustrator/snow.svg"
  };

  return (
    <section>
      <div className="flex flex-col items-center gap-2 pb-5 text-blue-950">
        {cityWeather &&
          <>
            <img
              className="w-52 h-44"
              src={`${weatherIcons[cityWeather.weather[0].main]}`}
              alt={`${cityWeather.weather[0].main}`}
            />
            <h2>{convertKelvinToCelsius(cityWeather.main.temp)}º</h2>
            <h6>Precipitations</h6>
            <div className="flex gap-4 text-base">
              <p>Max: {convertKelvinToCelsius(cityWeather.main.temp_max)}º</p>
              <p>Min: {convertKelvinToCelsius(cityWeather.main.temp_min)}º</p>
            </div>
            <div className="flex gap-6 dark:bg-blue-950 rounded-xl px-4 py-2">
              <div className="flex items-center gap-1">
                <Icons.DropLet />
                <span>{cityWeather.main.humidity}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Icons.Thermometer />
                <span>{convertKelvinToCelsius(cityWeather.main.feels_like)}º</span>
              </div>
              <div className="flex items-center gap-1">
                <Icons.Wind />
                <span>{cityWeather.wind.speed} km/h</span>
              </div>
            </div>
          </>
        }
        {isCityWeatherLoading &&
          <h6 className="mt-4">Carregando...</h6>
        }
        {!cityWeather &&
          <h6 className="mt-4">Pesquise uma cidade para começar</h6>
        }
      </div>
    </section>
  )
}