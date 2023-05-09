import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
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
