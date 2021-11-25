import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name === "") return;
    (async () => {
      try {
        if (!name) return;
        const response = await axios.get(
          `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
        );
        const countries = response.data;
        setCountry({ data: countries[0], found: true });
      } catch (err) {
        if (err.response.status === 404) {
          console.log(`Country ${name} not found`);
        } else {
          console.log(err);
        }
        setCountry({ data: null, found: false });
      }
    })();
  }, [name]);

  return country;
};
