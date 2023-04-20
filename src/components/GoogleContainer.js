import React, { useMemo } from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

    const GoogleMapContainer = () => {
        const { isLoaded } = useLoadScript({
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          });
          const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
        
          return (
            <div className="App">
              {!isLoaded ? (
                <h1>Loading...</h1>
              ) : (
                <GoogleMap
                  mapContainerClassName="map-container"
                  center={center}
                  zoom={10}
                >
                  <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
                </GoogleMap>
              )}
            </div>
          );
        };

export default GoogleMapContainer;