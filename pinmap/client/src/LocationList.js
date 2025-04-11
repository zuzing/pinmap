import {useEffect, useState} from 'react';

import LocationEntry from './LocationEntry';


function LocationList() {
    const [locations, setLocations] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const locations = fetch(process.env.REACT_APP_SERVER_API_URL + `/locations?page=${page}&limit=5`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {setLocations(data.data);})
        .catch(error => console.error('Error fetching locations:', error));
    }, [page]);


    return (
        <div className="location-list">
            <p text={locations} />
            {locations.map(location => (
                <LocationEntry key={location.id} location={location} />
            ))}

            <div className="pagination-controls">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Poprzednia
                </button>
                <button onClick={() => setPage(page + 1)} disabled={locations.length < 5}>
                    Następna
                </button>
            </div>
        </div>
    );
}

export default LocationList;