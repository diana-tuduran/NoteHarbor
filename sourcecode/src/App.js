import './App.css'
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import Header from './Components/Utils/Header';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import MainPage from './Components/MainPage/MainPage';


function App() {
    const view = useSelector((state) => state.view.view);
    const [user, setUser] = useState([]);


    return (
        <div className='App'>
            {view === 'login'
              ?
              <Login user={user} setUser={setUser}/>
              : 
              view === 'register'
              ?
              <Register />
              :
              view === 'main'
              ?
              <>
                <Header user={user} setUser={setUser}/>
                <MainPage user={user} setUser={setUser}/>
              </>
              :
              <h1>Wrong view</h1>
            }
        </div>
    );
}

export default App;
