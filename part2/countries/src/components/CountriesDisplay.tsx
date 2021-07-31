const CountryNameDisplay = ({
  country,
  onSelectCountry,
}: ICountryNameDisplayProps) => (
  <div>
    <span>{country.name}</span>
    &nbsp;
    <button type="button" onClick={() => onSelectCountry(country)}>
      show
    </button>
  </div>
);

const CountriesDisplay = ({
  countries,
  onSelectCountry,
}: ICountriesDisplayProps) => {
  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }
  return (
    <div>
      {countries.map((country, index) => (
        <CountryNameDisplay
          key={index}
          country={country}
          onSelectCountry={onSelectCountry}
        />
      ))}
    </div>
  );
};

export default CountriesDisplay;
