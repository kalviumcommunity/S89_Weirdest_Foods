import { BrowserRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import Allroutes from './Allroutes'
import Navbar from './components/Navbar'
import { setAuthToken, isAuthenticated } from './api'

function App() {
  const [authChecked, setAuthChecked] = useState(false);

  // Initialize auth token from localStorage on app startup
  useEffect(() => {
    // Check if token exists and set it for axios
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }

    // Mark auth as checked
    setAuthChecked(true);

    // Log authentication status
    console.log('Authentication status:', isAuthenticated() ? 'Authenticated' : 'Not authenticated');
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
