import './App.css'
import Axios from 'axios';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import Header from './Components/Utils/Header';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import MainPage from './Components/MainPage/MainPage';


function App() {
    const view = useSelector((state) => state.view.view);


    return (
        <div className="App">
            <Header />
            {view === 'login'
              ?
              <Login />
              : 
              view === 'register'
              ?
              <Register />
              :
              view === 'main'
              ?
              <MainPage />
              :
              <h1>Wrong view</h1>
            }
        </div>
    );
}

export default App;
