import { useState } from 'react'
import { TextField, Button, Card, CardContent, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { t } = useTranslation()

    const handleNewRegister = async () => {
        const data = {
          username: username,
          email: email,
          password: password
        }
    
        const response = await fetch('/api/v1/zombie/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
    
        const result = await response.json()

        if (response.ok) {
          console.log(result)
        } else {
          console.log(result.message)
        }
      }

    return (
        <div className='post-background'>
            <Card 
                variant="outlined"
                sx={{ width: 800, borderRadius: 3, boxShadow: 4, margin: 'auto', padding: 2, mb: 2 }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                  {t("register")}
                </Typography>
                  <TextField
                      label={t("username")}
                      fullWidth
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      margin="normal"
                  />
                  <TextField
                      label={t("email")}
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      margin="normal"
                  />
                  <TextField
                      label={t("password")}
                      type="password"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      margin="normal"
                  />
                  <Button variant="contained" color="primary" fullWidth onClick={handleNewRegister}>
                    {t("register")}
                  </Button>
            </Card>
        </div>
    )
}

export default Register