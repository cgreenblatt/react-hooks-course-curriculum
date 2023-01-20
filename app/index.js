import React from 'react'
import * as ReactDOM from 'react-dom/client';
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './contexts/theme'
import Loading from './components/Loading'
import Nav from './components/Nav'

const Posts = React.lazy(() => import('./components/Posts'))
const Post = React.lazy(() => import('./components/Post'))
const User = React.lazy(() => import('./components/User'))

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
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
        </ThemeProvider>
      </Router>
    )
  }
}

const rootElement = document.getElementById("app");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);