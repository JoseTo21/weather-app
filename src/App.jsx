import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'
import getRandomArray from './utils/getRandomArray'

const imgs = [1, 2, 3, 4, 5, 6]

function App() {

  const [latLon, setlatLon] = useState()
  const [weather, setweather] = useState()
  const [temperature, setTemperature] = useState()
  const [numerImg, setNumerImg] = useState(getRandomArray(imgs))


  useEffect(() => {
    const success = pos => {

      const objLatLon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setlatLon(objLatLon)
    }
  
    const error = () => {
      console.log(error)
    }
  
    navigator.geolocation.getCurrentPosition(success, error)

  }, [])

  useEffect(() => {
    if(latLon) {
      const apiKey = 'a1795c744afc6efdc6c60cfe6d9e5054'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${apiKey}`
      axios.get(url)
        .then(res => {
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const farenheit = (celsius * 9 / 5 +32).toFixed(1)
          
          setTemperature({ celsius, farenheit })
          setweather(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [latLon])
  
  const appStyle = {
    backgroundImage : `url('/backgrounds/bg${numerImg}.jpg')`
  }
  
  return (
    <div style={appStyle} className="App">
      {
        weather ?
        <WeatherCard 
          weather={weather}
          temperature={temperature}/>

        :
        <section className='loading__app'><Loading /></section>
          
      }
    </div>
  )
}

export default App
