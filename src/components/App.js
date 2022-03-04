import React from 'react';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';
import NavBar from './NavBar';
import Profile from './Profile';
import OtherUser from './OtherUser';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import { useAuth } from "../contexts/AuthContext"
import { Route, Navigate, Routes } from 'react-router-dom';

function App () {
  const { currentUser } = useAuth();

  return (
    <div className='App'>

      <NavBar currentUser={currentUser} style={{}} />
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
        <Route exact path='/Forgot-password' element={<ForgotPassword />
        }>
        </Route>
        <Route exact path='/Profile' element={
          !currentUser ? <Navigate to="/Login" /> : <Profile />
        }>
        </Route>
        <Route exact path='/Update-profile' element={
          !currentUser ? <Navigate to="/Login" /> : <UpdateProfile />
        }>
        </Route>
        <Route exact path='/' element={
          !currentUser ? <Navigate to="/Login" /> : <Home />
        }>
        </Route>
        <Route exact path='/Other-user' element={<OtherUser />
        }>
        </Route>
      </Routes>

    </div>
  );
};

export default App;
