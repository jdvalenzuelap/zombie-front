import MapComponent from '../components/MapComponent'
import { useState } from 'react'

const Mapa = () => {
  const [showResource, setShowResource] = useState(false)
  const [showForm, setShowForm] = useState(false)

  //Variables
  const [nombreRecurso, setNombreRecurso] = useState('')
  const [descripcionRecurso, setDescripcionRecurso] = useState('')
  const [longitud, setLongitud] = useState(0)
  const [latitud, setLatitud] = useState(0)

  const handleGuardar = () => {
    // Lógica para guardar la información ingresada en el formulario
    setShowForm(false)
  }

  return (
    <div className="Mapa">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h1 style={{ margin: 0, marginRight: '4rem' }}>Mapa de recursos</h1>
        <button onClick={() => setShowForm(true)}>+</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <MapComponent />
        {showForm && (
          <div className="modal">
            <h2
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              Ingrese un Recurso
            </h2>
            <ul>
              <li style={{ marginBottom: '0.5rem' }}>
                <label htmlFor="nombre">Nombre del recurso:</label>
                <input
                  type="text"
                  id="nombre"
                  //value={nombreRecurso}
                  //onChange={(e) => setNombreRecurso(e.target.value)}
                />
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <label htmlFor="descripcion">Descripción del recurso:</label>
                <textarea
                  id="descripcion"
                  //value={descripcionRecurso}
                  //onChange={(e) => setDescripcionRecurso(e.target.value)}
                ></textarea>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <label htmlFor="longitud">Longitud:</label>
                <input
                  type="number"
                  id="longitud"
                  //value={longitud}
                  //onChange={(e) => setLongitud(e.target.value)}
                />
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <label htmlFor="latitud">Latitud:</label>
                <input
                  type="number"
                  id="latitud"
                  //value={latitud}
                  //onChange={(e) => setLatitud(e.target.value)}
                />
              </li>
            </ul>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              <button style={{ marginRight: '0.5rem' }} onClick={handleGuardar} >Guardar</button>
              <button onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mapa