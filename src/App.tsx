import './App.css'
import { SectionTemperature } from './components/sections/SectionTemperature'
import { Navbar } from './components/Navbar'
import { WeatherProvider } from './providers/WeatherProvider'

function App() {
  return (
    <>
      <WeatherProvider>
        <div className='flex justify-center'>
          <div
            className='bg-gradient-to-tl bg-blue-500 dark:from-blue-900 dark:to-blue-950 mobile:w-[75%] p-4 mt-2 mobile:text-center rounded-2xl w-[50%] gap-2 container'>
            <Navbar />
            <SectionTemperature />
          </div>
        </div>
      </WeatherProvider>
    </>
  )
}

export default App