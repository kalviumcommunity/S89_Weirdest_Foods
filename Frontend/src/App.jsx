import { BrowserRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import Allroutes from './Allroutes'
import Navbar from './components/Navbar'
import CookieAuthTest from './components/CookieAuthTest'
import CookieProtectedTest from './components/CookieProtectedTest'
import { setAuthToken, isAuthenticated, checkAuthCookie } from './api'

function App() {
  const [authChecked, setAuthChecked] = useState(false);

  // Initialize auth token from localStorage on app startup
  useEffect(() => {
    const initAuth = async () => {
      // Check if token exists and set it for axios
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
      }

      // Check cookie authentication
      const cookieAuth = await checkAuthCookie();
      console.log('Cookie auth status:', cookieAuth);

      // Mark auth as checked
      setAuthChecked(true);

      // Log authentication status
      console.log('Token authentication status:', isAuthenticated() ? 'Authenticated' : 'Not authenticated');
    };

    initAuth();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <CookieAuthTest />
          <CookieProtectedTest />
          <Allroutes/>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
