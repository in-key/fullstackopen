import Weather from "./Weather";

const CountryDetail = ({country}) => {
    const languages = Object.values(country.languages);
    const flagurl = country.flags.png;
    console.log(country);
    return (

        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {languages.map( language => <li key={language}>{language}</li>)}
            </ul>
            <img src={flagurl} alt={`${country.name.common}-flag`}/>
            <Weather country={country}/>
        </div>
    )
}

export default CountryDetail;
