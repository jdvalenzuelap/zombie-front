import MapComponent from '../components/MapComponent'
import { useState } from 'react'

const Mapa = () => {
  const [showResource, setShowResource] = useState(false)

  return (
    <div className="Mapa">
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>
        Mapa de recursos
      </h1>
      <button onClick={() => setShowResource(prev => !prev)}>
        recurso
      </button>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <MapComponent />
        {showResource && (
          <div style={{ marginLeft: '2rem' }}>
            <h2>Nombre del recurso</h2>
            <p>Descripción del recurso</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mapa
