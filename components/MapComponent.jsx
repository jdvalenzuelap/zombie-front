import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

import Map, {
    Marker,
    NavigationControl,
    FullscreenControl,
    GeolocateControl,
  } from "react-map-gl";

import config from "../config/keys";

function MapComponent() {

  const [markers, setMarkers] = useState([
    { longitude: -103.348953, latitude: 20.659698 },
    { longitude: -103.448953, latitude: 20.759698 },
    { longitude: -103.548953, latitude: 20.859698 },
  ]);

  const addMarker = (longitude, latitude) => {
    const newMarker = { longitude, latitude };
    setMarkers([...markers, newMarker]);
  };

  const markerClick = (marker) => {
    console.log("Hola")
  };

  return (
    
    <div className="Mapa" style={{display: "flex", justifyContent: "center"}} >
      
      <Map
        mapboxAccessToken={config.mapBoxKey}
        
        style={{
            display: "flex",
            width: "500px",
            height: "500px",
            borderRadius: "15px",
            border: "2px solid red",
        }}

        // latitude={markers[0].latitude}
        // longitude={markers[0].longitude}
        // zoom={8}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        
        {markers.map((marker, index) => (
          <Marker 
            key={index}
            longitude={marker.longitude}
            latitude={marker.latitude}
            onClick={markerClick}/>
        ))}

        <NavigationControl position="bottom-right" />
        <FullscreenControl />

        <GeolocateControl />
      </Map>
    </div>
  );
}

export default MapComponent;