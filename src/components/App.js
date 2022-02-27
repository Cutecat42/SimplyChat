import { Route, Navigate, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';
import NavBar from './NavBar';
import Profile from './Profile';
import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext"

function App () {
  const { currentUser } = useAuth()
  console.log(currentUser)

  return (
    <div className='App'>

      <NavBar currentUser={currentUser} />
      <Routes>
        <Route exact path='/Login' element={<Login />
        }>
        </Route>
        <Route exact path='/Signup' element={<Signup />
        }>
        </Route>
        <Route exact path='/Logout' element={<Logout />
        }>
        </Route>
        <Route exact path='/Profile' element={
          !currentUser ? <Navigate to="/Login" /> : <Profile />
        }>
        </Route>
        <Route exact path='/' element={<Home />
        }>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
