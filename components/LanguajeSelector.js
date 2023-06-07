import React from 'react';
import { useState } from 'react'
import { FormControl, Select, MenuItem } from '@mui/material';
import { useTranslation } from "react-i18next";


const LanguajeSelector = () => {
    const [language, setLanguage] = useState('es');
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value)
        i18n.changeLanguage(e.target.value);
    };
    
    return (
        <FormControl>
            <Select 
                value={language} 
                onChange={handleLanguageChange}
                style={{ height: '28px', paddingTop: '8px', paddingBottom: '2px' }}
            >
                <MenuItem value="tl">Maya</MenuItem>
                <MenuItem value="es">Español</MenuItem>
            </Select>
        </FormControl>
    )
  }
  
  export default LanguajeSelector