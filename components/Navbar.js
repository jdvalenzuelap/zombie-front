import Link from 'next/link'
import LanguajeSelector from './LanguajeSelector'
import { useTranslation } from "react-i18next"
import { Box } from '@mui/material'

const Navbar = () => {
  const { t } = useTranslation()

  return (
    <nav>
      <Box display="flex" alignItems="center">
        <Link href="/" className='nav-button'>{t("home")}</Link>
        <Link href="/posts" className='nav-button'>{t("posts")}</Link>
        <Link href="/mapa" className='nav-button'>{t("mapa")}</Link>
      </Box>
      <div style={{ position: 'absolute', right: 40 }}>
        <LanguajeSelector />
      </div>
    </nav>
  )
}

export default Navbar