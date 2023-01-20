import React from 'react'
import { useThemeContext } from '../contexts/theme'
import { NavLink } from 'react-router-dom'

export default function Nav () {
  const [theme, toggleTheme] = useThemeContext();
  return (
        <nav className='row space-between'>
          <ul className='row nav'>
            <li>
              <NavLink
                to='/'

                className={({ isActive }) => `nav-link ${isActive ? 'nav-link--color' : ''}`}
              >
                  Top
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/new'
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link--color' : ''}`}
              >
                  New
              </NavLink>
            </li>
          </ul>
          <button
            style={{fontSize: 30}}
            className='btn-clear'
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🔦' : '💡'}
          </button>
        </nav>
      )}