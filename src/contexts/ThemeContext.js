import { ThemeProvider } from "@emotion/react";
import React, { createContext, useEffect, useState } from "react";
import { getHours } from 'date-fns'
import { darkTheme, lightTheme } from "../themes";

export const ThemeContext = createContext()

export const CustomThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState('light')

    useEffect(() => {
        if (getHours(new Date()) > 6 && getHours(new Date()) < 19) {
            setTheme('light')
            window.localStorage.setItem('theme', 'light')
        } else {
            setTheme('dark')
            window.localStorage.setItem('theme', 'dark')
        }
    }, [])

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
            window.localStorage.setItem('theme', 'dark')
        } else if (theme === 'dark') {
            setTheme('light')
            window.localStorage.setItem('theme', 'light')
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            <ThemeProvider theme={window.localStorage.getItem('theme') === 'light' ? lightTheme : darkTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}