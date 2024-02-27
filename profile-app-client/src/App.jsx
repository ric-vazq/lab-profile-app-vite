import './App.css'
import { Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import ErrorPage from './pages/ErrorPage'
import UserPage from './pages/UserPage'

function App() {


  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage /> } /> 
        <Route path='/auth/login' element={<LoginPage />} /> 
        <Route path='/auth/signup' element={<SignUpPage />} />
        <Route path='/user' element={<UserPage />} />

        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App
