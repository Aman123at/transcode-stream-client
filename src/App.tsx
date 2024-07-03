import { FC } from 'react'
import {HashRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'

const App:FC=()=> {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />}  />
        <Route path='/auth' element={<AuthPage />}  />
        <Route path='/dashboard' element={<Dashboard />}  />
        <Route path='*' element={<p>Page Not found</p>}  />
      </Routes>
    </HashRouter>
  )
}

export default App
