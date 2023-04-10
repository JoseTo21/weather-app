import React, { useState } from 'react'

const WeatherCard = ( { weather, temperature } ) => {
    
    console.log(weather, temperature)

    const [isCelsius, setIsCelsius] = useState(true)

    const handleChangeTemp = () => {
        setIsCelsius(!isCelsius)
    }

return (
    <article className='card__app'>
        <section className='app__title'>
            <h1 className='name__app'>Weather App</h1>
            <h2 className='name__city'>{weather?.name}, {weather?.sys.country}</h2>
        </section>

        <section className='info__app'>
            <header>
                <img  src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
            </header>
            <article className='info__city'>
                <h3 className='info__weather'>"{weather?.weather[0].description}"</h3>
                <ul>
                    <li><span>💨 Wind Speed </span>{weather?.wind.speed} m/s</li>
                    <li><span>⛅ Clouds </span>{weather?.clouds.all}%</li>
                    <li><span>🧭 Pressure </span>{weather?.main.pressure} hPa</li>
                </ul>
            </article>
        </section>
        <footer>
            <h2>{
                isCelsius
                    ? `${temperature?.celsius} °C`
                    : `${temperature?.farenheit} °F`
            }</h2>
            <button className='button__degrees' onClick={handleChangeTemp}>Change to {isCelsius ? '°F' : '°C'}</button>
        </footer>
    </article>
)
}

export default WeatherCard