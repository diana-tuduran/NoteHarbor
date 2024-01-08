import '../../App.css';
import * as React from 'react';
import {Box, Button, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux'
import { setView } from '../../Slicers/ViewSlice';
import logo from '../../Media/logo.png'

export default function Header(props){
    const {user, setUser} = props
    const view = useSelector((state) => state.view.view);

    const dispatch = useDispatch();

    const handleGoToLogin = () =>{
        dispatch(setView("login"))
    }
    const handleGoToMain = () =>{
        dispatch(setView("main"))
    }
    const handleGoToRegister = () =>{
        dispatch(setView("register"))
    }

    return (
        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}> 
            <img src={logo} alt="Logo" style={{width:'8vw', position:'fixed', top:'2vh', left:'3vw'}} />

            <Button onClick={handleGoToLogin}
                style={{position:'fixed', top:'2vh', left:'10vw'}}
            >
                Login
            </Button>
            {user.length > 0 
            ?
            <Typography
                style={{position:'fixed', top:'3vh', right:'3vw'}}
            >
                Welcome, {user[1]}
            </Typography>
            :<></>}
            
        </Box>
    )
}

