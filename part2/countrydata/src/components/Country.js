import { useState } from "react";
import CountryDetail from "./CountryDetail";

const Country = ({country}) => {
    const [visible, setVisible] = useState(false);

    return (
        <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => setVisible(!visible)}>{visible ? `hide` : `show`}</button>
            { visible &&
                <CountryDetail country={country}/>
            }
        </div>
    )
}

export default Country;
