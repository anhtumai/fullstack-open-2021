interface ICountryViewDisplayProps {
  country: ICountryData;
}

const CountryViewDisplay = ({ country }: ICountryViewDisplayProps) => {
  return (
    <div>
      <h3>{country.name}</h3>
      <div>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
      </div>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language, index) => (
          <li key={index}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="Flag not found" width="100"></img>
    </div>
  );
};

export default CountryViewDisplay;
