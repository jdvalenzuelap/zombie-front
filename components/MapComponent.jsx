import { useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useRouter } from 'next/router'

import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from 'react-map-gl'

import config from '../config/keys'

function MapComponent() {
  const [showResource, setShowResource] = useState(false)
  const [markers, setMarkers] = useState([
    { longitude: -103.348953, latitude: 20.659698 },
    { longitude: -103.448953, latitude: 20.759698 },
    { longitude: -103.548953, latitude: 20.859698 },
  ])
  const [markerShown, setMarkerShown] = useState()
  const router = useRouter()

  useEffect(() => { 
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('http://localhost:3001/api/v1/zombie/point', {
      method: 'GET'
    })

    const result = await response.json()

    if (response.ok) {
      const points = result.map(point => ({
        title: point.title,
        description: point.description,
        longitude: point.lon,
        latitude: point.lat,
        id: point._id,
      }))
      console.log(points)
      setMarkers(points)
    } else {
      console.log(result)
    }
  }

  const errasePoint = async (id) => {
    const response = await fetch(`http://localhost:3001/api/v1/zombie/point/delete/${id}`, {
      method: 'DELETE'
    })

    const result = await response.json()

    if (response.ok) {
      console.log(result)
      router.reload()
    } else {
      console.log(result)
    }
  }

  const addMarker = (longitude, latitude) => {
    const newMarker = { longitude, latitude }
    setMarkers([...markers, newMarker])
  }


  const markerClick = (marker) => {
    setMarkerShown(marker)
    setShowResource((prevValue) => !prevValue)
  }

  return (
    <div className="Mapa" style={{ display: 'flex', justifyContent: 'center' }}>
      <Map
        mapboxAccessToken={config.mapBoxKey}
        style={{
          display: 'flex',
          width: '500px',
          height: '500px',
          borderRadius: '15px',
          border: '2px solid red',
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
            onClick={() => markerClick(marker)}
          />
        ))}

        <NavigationControl position="bottom-right" />
        <FullscreenControl />

        <GeolocateControl />
      </Map>
      {showResource && (
        <div style={{ marginLeft: '2rem' }}>
          <h2>{markerShown.title}</h2>
          <p>{markerShown.description}</p>
          <p>Lon: {markerShown.longitude}</p>
          <p>Lat: {markerShown.latitude}</p>
          <button onClick={() => errasePoint(markerShown.id)}>Borrar punto</button>
        </div>
      )}
    </div>
  )
}

export default MapComponent
