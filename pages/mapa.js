import MapComponent from '../components/MapComponent'
import { useState } from 'react'
import { useTranslation } from "react-i18next"

const Mapa = () => {
  const [showResource, setShowResource] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const { t } = useTranslation()

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
        <h1 style={{ margin: 0, marginRight: '4rem' }}>{t("resourcesMap")}</h1>
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
              {t("writeResource")}
            </h2>
            <ul>
              <li style={{ marginBottom: '0.5rem' }}>
                <label htmlFor="nombre">{t("resourceName")}</label>
                <input
                  type="text"
                  id="nombre"
                  //value={nombreRecurso}
                  //onChange={(e) => setNombreRecurso(e.target.value)}
                />
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <label htmlFor="descripcion">{t("resourceDescription")}</label>
                <textarea
                  id="descripcion"
                  //value={descripcionRecurso}
                  //onChange={(e) => setDescripcionRecurso(e.target.value)}
                ></textarea>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <label htmlFor="longitud">{t("longitud")}</label>
                <input
                  type="number"
                  id="longitud"
                  //value={longitud}
                  //onChange={(e) => setLongitud(e.target.value)}
                />
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <label htmlFor="latitud">{t("latitud")}</label>
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
              <button style={{ marginRight: '0.5rem' }} onClick={handleGuardar}>{t("save")}</button>
              <button onClick={() => setShowForm(false)}>{t("cancel")}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mapa