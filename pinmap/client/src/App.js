import { useState, useEffect } from 'react';

import Map from './Map';
import LocationList from './LocationList';

function App() {
    const [pins, setPins] = useState([]);

    useEffect(() => {
        const fetchPins = async () => {
            const res = await fetch(process.env.REACT_APP_SERVER_API_URL + '/pins');
            const pins = await res.json();
            setPins(pins);
        };

        fetchPins();
    }, []);

    return (
        <div className="App">
            <h1>PinMap</h1>
            <Map pins={pins} setPins={setPins}/>
            <LocationList pins={pins} setPins={setPins} />
        </div>
    );
}

export default App;