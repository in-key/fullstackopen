import Country from "./Country";
import CountryDetail from "./CountryDetail";

const CountryList = ({countries}) => {
    if (countries.length > 10){
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length === 1){
        const country = countries[0];
        return (
            <CountryDetail country={country}/>
        )
    } else {
        return (
            <div>
                {countries.map( country => <Country key={country.name.common} country={country}/>)}
            </div>
        )
    }
}

export default CountryList;
