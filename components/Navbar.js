import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
      <Link href="/" className='nav-button'>Home</Link>
      <Link href="/posts" className='nav-button'>Posts</Link>
      <Link href="/mapa" className='nav-button'>Mapa</Link>
    </nav>
  )
}

export default Navbar