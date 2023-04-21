import { ThemeProvider } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { getHours} from 'date-fns'
import { darkTheme, lightTheme } from "../themes";

export default function CustomThemeProvider ({children}) {

    const [theme, setTheme] = useState(null)

    useEffect(()=> {
        if (getHours(new Date()) > 6 && getHours(new Date()) < 19) {
          setTheme(lightTheme)
        } else {
          setTheme(darkTheme)
        } 
      }, [])

    return (
        <>
        {theme && 
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
        }
        </>
    )
}