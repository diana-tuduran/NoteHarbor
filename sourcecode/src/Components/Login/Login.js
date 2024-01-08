import '../../App.css'
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Button, TextField, } from '@mui/material';
import { setView } from '../../Slicers/ViewSlice';
import name_logo from '../../Media/name_logo.png'
import pathstring from '../Utils/pathstring';

export default function Login(props){
    const {user, setUser} = props

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const view = useSelector((state) => state.view.view);
    const dispatch = useDispatch();

    const handleLogin = async () =>{
        //alert("USERNAME: " + username + "\nPASSWORD: " + password);

        axios.post(pathstring + '/login',{
                username: username,
                password: password,
            }).then((res) => {
                // JSON response is handled by a json() promises

                if(res.data !== 'Wrong username or password'){
                    dispatch(setView("main"));
                    setUser(res.data[0]);
                    //alert(JSON.stringify(res.data[0]));
                }
                else
                    alert(JSON.stringify(res.data))

           });
    }

    const handleGoToRegister = () =>{
        dispatch(setView("register"));
    }

    return (
        <div className='Background-login'>
            <img src={name_logo} alt="Logo" style={{width:'40vw', }} />


            <h1>Login</h1>

            <TextField label="Username" variant="standard" 
                value={username}

                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(event.target.value);
                  }}
            />
            <TextField label="Password" variant="standard" 
                value={password}

                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(event.target.value);
                  }}
            />
            <Button className='Text-button' 
                onClick={handleLogin}
                disabled={username === '' || password === '' ? true : false}
            >
                Log In
            </Button>

            <Button  className='Text-button' 
                onClick={handleGoToRegister}
            >
                Create an account
            </Button>
        </div>
    )
}