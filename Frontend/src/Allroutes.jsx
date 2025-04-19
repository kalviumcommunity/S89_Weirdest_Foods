import React from 'react'
import {Routes,Route} from 'react-router-dom';
import About from './About';
import WeirdFood from './components/WierdFood';

const Allroutes = () => {
  return (
    <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/' element={<WeirdFood/>}/>
        <Route path="/foodlist" element={<FoodList />} />   
    </Routes>
  )
}

export default Allroutes 