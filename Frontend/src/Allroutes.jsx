import React from 'react'
import {Routes,Route} from 'react-router-dom';
import About from './About';
import WeirdFood from './pages/WierdFood';
import FoodList from './pages/FoodList';
import Contact from './components/Contact';
import AddEntityPage from './pages/AddEntityPage';
import ManageEntitiesPage from './components/ManageEntitiesPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

const Allroutes = () => {
  return (
    <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/' element={<WeirdFood/>}/>
        <Route path="/foodlist" element={<FoodList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add-entity" element={
          <ProtectedRoute>
            <AddEntityPage />
          </ProtectedRoute>
        } />
        <Route path="/manage-entities" element={
          <ProtectedRoute>
            <ManageEntitiesPage />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default Allroutes