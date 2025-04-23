import React from 'react'
import {Routes,Route} from 'react-router-dom';
import About from './About';
import WeirdFood from './components/WierdFood';
import FoodList from './pages/FoodList';
import Contact from './components/Contact';
import AddEntityPage from './pages/AddEntityPage';

const Allroutes = () => {
  return (
    <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/' element={<WeirdFood/>}/>
        <Route path="/foodlist" element={<FoodList />} />
        <Route path="/contact" element={<Contact />} />  
        <Route path="/add-entity" element={<AddEntityPage />} />
    </Routes>
  )
}

export default Allroutes 