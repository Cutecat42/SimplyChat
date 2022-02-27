import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';
import NavBar from './NavBar';
import Profile from './Profile';
import React, { useState } from 'react';

function App () {
  let user;
  const [userAuth, setUserAuth] = useState("");


  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar user={user} />
        <Routes>
          <Route exact path='/Login' element={<Login setUserAuth={setUserAuth} />
          }>
          </Route>
          <Route exact path='/Signup' element={<Signup setUserAuth={setUserAuth} />
          }>
          </Route>
          <Route exact path='/Logout' element={<Logout />
          }>
          </Route>
          <Route exact path='/Profile' element={
            !user ? <Navigate to="/Login" /> : <Profile />
          }>
          </Route>
          <Route exact path='/' element={<Home />
          }>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
