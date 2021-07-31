import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import CountriesDisplay from "./components/CountriesDisplay";
import CountryViewDisplay from "./components/CountryViewDisplay";
import WeatherDisplay from "./components/WeatherDisplay";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState<ICountryData[]>([]);
  const [country, setCountry] = useState<ICountryData | undefined>();

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setCountry(undefined);
    setFilter(e.target.value);
  }

  const displayedCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  const body =
    country === undefined && displayedCountries.length > 1 ? (
      <CountriesDisplay
        countries={displayedCountries}
        onSelectCountry={setCountry}
      />
    ) : country !== undefined ? (
      <div>
        <CountryViewDisplay country={country} />
        <WeatherDisplay countryName={country.name} />
      </div>
    ) : displayedCountries.length === 1 ? (
      <div>
        <CountryViewDisplay country={displayedCountries[0]} />
        <WeatherDisplay countryName={displayedCountries[0].name} />
      </div>
    ) : (
      <div>
        <p>Loading countries ...</p>
      </div>
    );

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      {body}
    </div>
  );
};

export default App;
