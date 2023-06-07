import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { useEffect, useState } from 'react'

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
