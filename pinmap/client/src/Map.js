import { useState, useCallback} from "react";
import {
    APIProvider,
    Map as GoogleMap,
    Marker,
} from '@vis.gl/react-google-maps';

function Map({pins, setPins}) {
    const onMapClick = useCallback(async (e) => {
        const {lat, lng} = e.detail.latLng;

        const geoJsonData = {
            name: "New Pin",
            loc: {
                type: "Point",
                coordinates: [lng, lat], // Note: coordinates are in [longitude, latitude] order
            },
        };

        const res = await fetch(process.env.REACT_APP_SERVER_API_URL + "/pin", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(geoJsonData),
        });

        if (res.ok) {
            const newPin = await res.json();
            setPins((prevPins) => [...prevPins, newPin]);
        }
    }, [pins]);


    return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                style={{width: '100%',height: '500px',}}
                defaultCenter={{lat: 50.06255275511061, lng: 19.939309651193764}}
                defaultZoom={14}
                onClick={onMapClick}
            >
            {pins.map((pin, idx) => (
                <Marker key={idx} position={{ //Note: coordinates are in [longitude, latitude] order
                    lat: pin.loc.coordinates[1],
                    lng: pin.loc.coordinates[0],
                }}
                />
            ))}
            </GoogleMap>
        </APIProvider>
    );
}

export default Map;