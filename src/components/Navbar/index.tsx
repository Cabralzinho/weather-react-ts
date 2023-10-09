import { useState } from "react"
import { useWeather } from "../../hooks/useWeather"
import { Icons } from "../Icons"

type CityData = {
  name: string
  city: string
  state: string
  lat: number
  lon: number
}

export const Navbar = () => {
  const { searchCitiesByName, citiesSearch, searchCityWeather } = useWeather()
  const [inputValue, setInputValue] = useState("")
  const [isListVisible, setListVisible] = useState(true);

  const handleCityClick = (city: CityData) => {
    searchCitiesByName(city.name)
    setInputValue(city.name)
    searchCityWeather(city)
    setListVisible(false)
  }

  const handleInputChange = (e: any) => {
    const value = e.target.value
    setInputValue(value)

    setListVisible(true)

    if (value === "") {
      setListVisible(false)
    }

    if (value.trim() !== "") {
      searchCitiesByName(value)
    }
  }

  let filteredCities: CityData[] = [];

  if (Array.isArray(citiesSearch)) {
    filteredCities = citiesSearch.filter((city) => city.name.toLowerCase().includes(inputValue.toLowerCase())
    ) as unknown as CityData[];
  }

  return (
    <nav className="flex flex-col gap-0.5">
      <div className="flex justify-center items-center pt-4 dark:text-white text-base gap-1">
        <div className="flex items-center justify-between p-4 rounded-full bg-white text-black">
          <input
            className="text-black outline-none rounded-3xl w-full pl-3 bg-transparent"
            type="text"
            placeholder="Write your city"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Icons.Search className="text-xl" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="dark:bg-blue-100 dark:text-black rounded-md overflow-hidden w-[45%] mobile:w-[75%]">
          {isListVisible && (
            <ul className="divide-y-2 divide-slate-400">
              {filteredCities.map(city => (
                <li
                  key={city.name}
                  onClick={() => handleCityClick(city)}
                  className="flex items-center mobile:justify-between gap-4 cursor-pointer bg-blue-100 hover:bg-blue-300 dark:hover:bg-blue-400 transition-all p-2">
                  <span>{city.name}</span>
                  <span className="dark:opacity-80 opacity-90 text-sm">{city.state}</span>
                </li>
              ))}
            </ul>)
          }
        </div>
      </div>
    </nav>
  )
}