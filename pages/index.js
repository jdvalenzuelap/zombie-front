import styles from '../styles/Home.module.css'
import { Button, Box } from '@mui/material'
import React from "react"
import { useTranslation } from "react-i18next"

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className='post-background'>
      <p className={styles.title}>Melon Fox</p>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ mt : 25}}
      >
        <Button href="/login" variant="contained" style={{ marginRight: '10px', width: 300, height: 100, fontSize: '30px'}}>
          {t("login")}
        </Button>
        <Button href="/register" variant="contained" style={{ marginLeft: '10px', width: 300, height: 100, fontSize: '30px'}}>
          {t("register")}
        </Button>
      </Box>
    </div>
  )
}
