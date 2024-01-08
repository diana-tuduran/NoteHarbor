import '../../App.css'
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Button, Grid, TextField, Typography } from '@mui/material';
import { setView } from '../../Slicers/ViewSlice';
import DownloadCard from './DownloadCard';

export default function FileList(props){
    const {files, setFiles} = props
  
    return (
        <div className='File-list'>
            <Grid container spacing={0}>
                {files.length > 0 
                ?
                <>
                    {files.map((file) => (
                        
                        <Grid item xs={6}>
                            <DownloadCard file={file} files={files} setFiles={setFiles}/>
                        </Grid>
                    ))}
                </>
                :
                <>
                    no files here
                </>}
            </Grid>   
                
        </div>

    )
}