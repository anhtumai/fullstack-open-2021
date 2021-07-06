import WeatherDisplay from "./WeatherDisplay";
import CountryViewDisplay from "./CountryViewDisplay";

interface ILanguageData {
  name: string;
}

export interface ICountryData {
  name: string;
  capital: string;
  population: number;
  languages: ILanguageData[];
  flag: string;
}

interface ICountriesDisplayProps {
  countries: ICountryData[];
  country: ICountryData | undefined;
  setCountry(newCountry: ICountryData): void;
}

interface ICountryNameDisplayProps {
  country: ICountryData;
  setCountry(country: ICountryData): void;
}

const CountryNameDisplay = ({
  country,
  setCountry,
}: ICountryNameDisplayProps) => (
  <div>
    <span>{country.name}</span>
    &nbsp;
    <button type="button" onClick={() => setCountry(country)}>
      show
    </button>
  </div>
);

const CountriesDisplay = ({
  countries,
  country,
  setCountry,
}: ICountriesDisplayProps) => {
  if (country !== undefined) {
    return (
      <div>
        <CountryViewDisplay country={country} />
      </div>
    );
  }

  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }
  if (countries.length === 1) {
    const displayedCountry = countries[0];
    return (
      <div>
        <CountryViewDisplay country={displayedCountry} />
        <WeatherDisplay countryName={displayedCountry.name} />
      </div>
    );
  }
  return (
    <div>
      {countries.map((country) => (
        <CountryNameDisplay country={country} setCountry={setCountry} />
      ))}
    </div>
  );
};

export default CountriesDisplay;
