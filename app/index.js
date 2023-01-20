import React from 'react'
import * as ReactDOM from 'react-dom/client';
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeContextProvider, useThemeContext } from './contexts/theme'
import Loading from './components/Loading'
import Nav from './components/Nav'

const Posts = React.lazy(() => import('./components/Posts'))
const Post = React.lazy(() => import('./components/Post'))
const User = React.lazy(() => import('./components/User'))

function ThemedApp () {
  const [theme] = useThemeContext();
  return (
    <div className={theme}>
      <div className='container'>
        <Nav />
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path='/'
              element={<Posts type='top'/>}
            />
            <Route
              path='/new'
              element={<Posts type='new'/>}
            />
            <Route path='/post' element={<Post />} />
            <Route path='/user' element={<User />} />
          </Routes>
        </React.Suspense>
      </div>
    </div>
  )

}

function App() {
  return (
    <Router>
      <ThemeContextProvider>
        <ThemedApp />
      </ThemeContextProvider>
    </Router>
  )

}

const rootElement = document.getElementById("app");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);