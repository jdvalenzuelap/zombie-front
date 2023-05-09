import React, { Component } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

import Map, {
    Marker,
    NavigationControl,
    Popup,
    FullscreenControl,
    GeolocateControl,
  } from "react-map-gl";

import { useState } from "react";

function MapComponent() {
  const [lng, setLng] = useState(54.37585762735543);
  const [lat, setLat] = useState(24.45677614934833);

  return (
    
    <div className="Mapa" style={{display: "flex", justifyContent: "center"}} >
    {console.log(process.env.REACT_APP_MAP_KEY)}
      
      <Map
        mapboxAccessToken={"pk.eyJ1IjoiYWxmcmVkZ2ciLCJhIjoiY2xmanZ4dnFyMDNqYjNzdGEzdGVldWh6dSJ9.QkbBp_QzALUsWv-eNJ6gGg"}
        
        style={{
            display: "flex",
            width: "500px",
            height: "500px",
            borderRadius: "15px",
            border: "2px solid red",
        }}

        initialViewState={{
          longitude: lng,
          latitude: lat,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} />
        <NavigationControl position="bottom-right" />
        <FullscreenControl />

        <GeolocateControl />
      </Map>
    </div>
  );
}

export default MapComponent;