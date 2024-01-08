import '../../App.css'
import React, {useEffect, useState} from 'react';
import PuffLoader from "react-spinners/PuffLoader"
import { Typography } from '@mui/material';


export default function Loader(){
    return (
        <div className='Loader'>
            <PuffLoader />
            <Typography sx={{marginTop:'5vh'}}>
                Converting audio file...
            </Typography>
        </div>

    )
}