import '../../App.css'
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Button, TextField, } from '@mui/material';
import { setView } from '../../Slicers/ViewSlice';
import logo from '../../Media/logo.png'
import name from '../../Media/name.png'
import pathstring from '../Utils/pathstring';

export default function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const view = useSelector((state) => state.view.view);
    const dispatch = useDispatch();

    const handleCreateAccount = () =>{
        //alert("USERNAME: " + username + "\nPASSWORD: " + password);

        let inputs = {username, password};

        // axios.post('http://localhost:5000/createAcc', inputs).then(function(response){
        //     console.log(response.data);

        // });

        axios.post(pathstring + '/createAcc',{
                username: username,
                password: password,
            }).then((res) => {
                // JSON response is handled by a json() promises
                //alert(JSON.stringify(res.data))
           });
        //alert("User Added");
        dispatch(setView("login"));
    }

    const handleGoToLogin = () =>{
        dispatch(setView("login"));
    }

    return (
        <div className='Background-login'>
            <img src={logo} alt="Logo" style={{width:'24vw', position:'fixed', top:'2vh', left:'38vw'}} />
            <img src={name} alt="name" style={{width:'70vw', position:'fixed', top:'20vh', left:'15vw'}} />

            <h1>Create an Account</h1>

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
            <Button
                onClick={handleCreateAccount}
                disabled={username === '' || password === '' ? true : false}
            >
                Register
            </Button>
            
            <Button
                onClick={handleGoToLogin}
            >
                Already have an account?
            </Button>

        </div>
    )
}