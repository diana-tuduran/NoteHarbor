import '../../App.css';
import * as React from 'react';
import {Box, Button} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux'
import { setView } from '../../Slicers/ViewSlice';

export default function Header(){
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
            <Button onClick={handleGoToLogin}>LOGIN</Button>
            <Button onClick={handleGoToMain}>Main Page</Button>
            <Button onClick={handleGoToRegister}>Register</Button>
        </Box>
    )
}

