import '../../App.css'
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { IconButton , Typography } from '@mui/material';
import { setView } from '../../Slicers/ViewSlice';
import note from '../../Media/note.png'
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import pathstring from '../Utils/pathstring';


export default function DownloadCard(props){
    const {file, files, setFiles} = props
    

    const handleDeleteButton = () => {
        let parameters = new FormData();

        parameters.append('filename', file[0]);

        axios.post(pathstring + '/deleteFile', parameters)
            .then((res) => {
                alert(res.data);
                setFiles(files.filter(item => item !== file));
           });
    }

    
  
    return (
        <div className='Card'
           // onClick={handleDownload}
        >
            <Typography>
                {file[0].slice(file[0].indexOf('_') + 1)}
            </Typography>

            <img src={note} alt="note" style={{width:'44vw', marginTop:'0.5vh'}} />

            <a href={pathstring + '/download?filename='+file[0]} target="blank">
                <IconButton >
                    <DownloadIcon />
                </IconButton >
            </a>
                <IconButton onClick={handleDeleteButton}>
                    <DeleteIcon />
                </IconButton >
  
            
        </div>

    )
}