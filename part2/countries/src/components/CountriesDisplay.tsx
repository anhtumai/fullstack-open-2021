import { useState, useEffect } from 'react';
import axios from 'axios'

interface ILanguageData {
    name: string
}

export interface ICountryData {
    name: string
    capital: string
    population: number
    languages: ILanguageData[]
    flag: string
}

interface IWeatherData {
    temperature: number
    weather_icons: string
    wind_speed: number
    wind_degree: number
    wind_dir: string
}

interface IWeatherDisplayProps {
    countryName: string
}

interface ICountriesDisplayProps {
    filter: string
    countries: ICountryData[]
    country: ICountryData | undefined
    setCountry(newCountry: ICountryData): void
}

interface ICountryViewDisplayProps {
    country: ICountryData
}

interface ICountryNameDisplayProps {
    country: ICountryData
    setCountry(country: ICountryData): void
}

const CountryViewDisplay = ({ country }: ICountryViewDisplayProps) => {
    return (
        <div>
            <h3>{country.name}</h3>
            <div>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
            </div>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(language => <li>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt="Flag not found" width="100"></img>
            <WeatherDisplay countryName={country.name} />
        </div>
    )
}

const WeatherDisplay = ({ countryName }: IWeatherDisplayProps) => {
    const [weather, setWeather] = useState<IWeatherData>()
    useEffect(() => {

        let mounted = true
        axios
            .get("http://api.weatherstack.com/current", { params: { access_key: process.env.REACT_APP_API_KEY, query: countryName } })
            .then(response => { if (mounted) setWeather(response.data.current) })
            .catch(err => { console.log(err) })
        return () => { mounted = false };
    }, [countryName])
    if (weather !== undefined) {
        return (
            <div>
                <h3>Weather</h3>
                <p><b>temperature:</b> {weather.temperature} Celcius</p>
                <img src={weather.weather_icons} alt="Weather icon not found" width="40"></img>
                <p>{weather.wind_speed} mph direction {weather.wind_dir}</p>
            </div>
        )
    }
    return (<div></div>);


}

const CountryNameDisplay = ({ country, setCountry }: ICountryNameDisplayProps) => (
    <p>{country.name} <button type="button" onClick={() => setCountry(country)}>show</button></p>
)

const CountriesDisplay = ({ filter, countries, country, setCountry }: ICountriesDisplayProps) => {

    if (country !== undefined) {
        return <div><CountryViewDisplay country={country} /></div>
    }

    const displayedCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    if (displayedCountries.length > 10) {
        return <div><p>Too many matches, specify another filter</p></div>
    }
    if (displayedCountries.length === 1) {
        const displayedCountry = displayedCountries[0]
        return <div><CountryViewDisplay country={displayedCountry} /></div>

    }
    return (
        <div>
            {displayedCountries.map(country => (
                <CountryNameDisplay country={country} setCountry={setCountry} />
            ))}
        </div >
    )
}

export default CountriesDisplay