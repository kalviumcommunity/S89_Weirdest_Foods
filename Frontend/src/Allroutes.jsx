import React from 'react'
import {Routes,Route} from 'react-router-dom';
import About from './About';

const Allroutes = () => {
  return (
    <Routes>
        <Route path='/' element={<About/>}/>    
    </Routes>
  )
}

export default Allroutes 