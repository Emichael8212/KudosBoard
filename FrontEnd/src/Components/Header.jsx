import './Header.css'
import { useTheme } from '../Context/ThemeContext'

export default function Header() {
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <>
            <header className='header-container'>
                <h1>Kudo Board</h1>
                <button
                    className={`toggle-mode ${darkMode ? 'dark' : 'light'}`}
                    onClick={toggleDarkMode}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </header>
        </>
    )
}
