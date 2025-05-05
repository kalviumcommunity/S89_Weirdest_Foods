import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Allroutes from './Allroutes'
import Navbar from './components/Navbar'
import { setAuthToken } from './api'

function App() {
  // Initialize auth token from localStorage on app startup
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Allroutes/>
      </BrowserRouter>
    </>
  )
}

export default App
