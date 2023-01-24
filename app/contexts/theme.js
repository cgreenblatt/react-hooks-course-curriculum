import React, { useContext, useState} from 'react'

const ThemeContext = React.createContext();

export function useThemeContext() {
    const contextValue = useContext(ThemeContext);
    if (!contextValue) {
        throw new Error(
            'useThemeContext must be called within a ThemeContextProvider'
        );
    }
    return contextValue;
}

export function ThemeContextProvider(props) {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => setTheme((theme) => theme === 'light' ? 'dark' : 'light');
    const value = [theme, toggleTheme];
    return <ThemeContext.Provider value={value} {...props} />
}
