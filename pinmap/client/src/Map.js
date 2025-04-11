import { useState, useCallback, useRef, useEffect} from "react";
import {
    APIProvider,
    Map as GoogleMap,
    Marker,
} from '@vis.gl/react-google-maps';

function Map() {
    const [markers, setMarkers] = useState([]);
    const mapRef = useRef(null);

    const fetchVisiblePins = async () => {
        if (!mapRef.current) return;

        const bounds = mapRef.current.getBounds();
        if (!bounds) return;

        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();

        // TODO: get only pins in the visible area
        // const url = process.env.REACT_APP_SERVER_API_URL + `/pins?neLat=${ne.lat()}&neLng=${ne.lng()}&swLat=${sw.lat()}&swLng=${sw.lng()}`;
        const url = process.env.REACT_APP_SERVER_API_URL + `/pins`;
        const res = await fetch(url);
        const pins = await res.json();
        setMarkers(pins);
    };

    const onMapClick = useCallback(async (e) => {
        const latLng = e.detail.latLng;
        await fetch(process.env.REACT_APP_SERVER_API_URL + "/pin", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(latLng),
        });

        setMarkers((prevMarkers) => {
            return [...prevMarkers, latLng];
        });
    }, []);


    return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                ref={mapRef}
                style={{width: '100%',height: '500px',}}
                defaultCenter={{lat: 50.06255275511061, lng: 19.939309651193764}}
                defaultZoom={14}
                onClick={onMapClick}
                onIdle={() => fetchVisiblePins()}
            >
            {markers.map((marker, idx) => (
                <Marker key={idx} position={marker} />
            ))}
            </GoogleMap>
        </APIProvider>
    );
}

export default Map;