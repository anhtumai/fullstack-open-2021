declare global {
  interface ILanguageData {
    name: string;
  }

  interface ICountryData {
    name: string;
    capital: string;
    population: number;
    languages: ILanguageData[];
    flag: string;
  }

  interface ICountriesDisplayProps {
    countries: ICountryData[];
    onSelectCountry(newCountry: ICountryData): void;
  }

  interface ICountryNameDisplayProps {
    country: ICountryData;
    onSelectCountry(country: ICountryData): void;
  }
}

export {};
