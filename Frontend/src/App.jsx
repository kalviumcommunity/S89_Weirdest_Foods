import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Allroutes from './Allroutes'
import Navbar from './components/Navbar'

function App() {

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
