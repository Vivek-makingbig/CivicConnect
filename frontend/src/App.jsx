import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import RescueTeam from './pages/RescueTeam'
import User from './pages/User'
import Login from './components/Login'
import Register from './components/Register'
import Admin from './pages/Admin'
import Topbar from './components/rescue/Topbar'
import HowItWorks from './pages/HowItWorks'



function App() {
   const [role, setRole] = useState(null);
  return (
    <BrowserRouter>
       
     

   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/HowItWorks" element={<HowItWorks />} />
       <Route path="/login" element={<Login setRole={setRole}/>} />
   
     <Route path="/register" element={<Register />} />

    <Route
       path="/user"
       element={role === "user" ? <User /> : <Navigate to="/login" />}
     />
     <Route
       path="/admin"
       element={role === "admin" ? <Admin /> : <Navigate to="/login" />}
     />

       <Route
         path="/rescue"
         element={role === "rescue" ? <RescueTeam /> : <Navigate to="/login" />}
       />

       
      </Routes>
    </BrowserRouter>
  )
}

export default App


