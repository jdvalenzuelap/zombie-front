import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import '../styles/globals.css'
import '../i18next'

function MyApp({ Component, pageProps }) {
  const [webNavigator, setWebNavigator] = useState(null)

  useEffect(() => {
    setWebNavigator(navigator)
  }, [webNavigator])

  if (webNavigator && 'serviceWorker' in webNavigator) {
    webNavigator.serviceWorker.register('/sw.js')
  }

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
