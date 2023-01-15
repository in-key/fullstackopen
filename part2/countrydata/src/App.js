import axios from "axios";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import Filter from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountries(res.data);
      })
  }, [])

  const countriesShown = filter === '' ? [] : countries.filter( c => c.name.common.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h1>Country Data</h1>
      <Filter filter={filter} setFilter={setFilter}/>
      <CountryList countries={countriesShown}/>
    </div>
  );
}

export default App;
