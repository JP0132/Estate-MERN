import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home, About, Profile, LogIn, SignUp} from "./pages/page";
import {Header} from "./components/components";

export default function App() {
  return <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
  </BrowserRouter>
   
  
}
