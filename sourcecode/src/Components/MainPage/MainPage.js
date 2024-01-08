import '../../App.css'
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Button, } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import FileList from './FileList';
import Loader from '../Utils/Loader'
import name from '../../Media/name.png'
import pathstring from '../Utils/pathstring';


export default function MainPage(props){
    const {user, setUser} = props
    
    //---------- ATTACHMENT ----------
    const fileInputRef = React.createRef();
    const fileInputClicked = (e) => {fileInputRef.current.click()};
    const [openUploadAlert, setOpenUploadAlert] = useState(false);
    const [file, setFile] = useState([]);
    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [openAlertEdit, setOpenAlertEdit] = useState(false);
    const [files, setFiles] = useState([]);
    const [refreshPage, setRefreshPage] = useState(true);
    const [waiting, setWaiting] = useState(false);


    //---------- ATTACHMENT FUNCTIONS ----------
    const filesSelected = () => {
        console.log('fileInputRef.current.files.length = ' + fileInputRef.current.files.length);

        if(fileInputRef.current.files.length){
            if(validateFile(fileInputRef.current.files)){
                //alert(JSON.stringify(fileInputRef.current.files));
                console.log('wee: valid file');
                setOpenUploadAlert(true);
                setFile([fileInputRef.current.files]);
            }
            else {
                console.log("file not good. printing alerts")
                setAlertType('warning');
                setAlertMessage('The file does not meet the requested formats !');
                setOpenAlertEdit(true);
            }
        }
        else {console.log("fileInputRef.current.files.length null for some reason")}
    }

    const validateFile = (files) => {
        var ok = 1;

        var validFiles = ["audio/mpeg", "audio/wav"];

        for(var i = 0; i < files.length; i++){
            console.log("    Name: " + JSON.stringify(files[i].name) + "\n    Type: " + JSON.stringify(files[i].type))
            console.log(files[i].name.substring(files[i].name.indexOf('.') + 1))
            console.log(validFiles.indexOf(files[i].type))


            if(validFiles.indexOf(files[i].type) < 0) {
                ok = 0;
            }
        }

        return (ok == 1);
    }

    //---------- UPLOAD ----------
    
    const handleUploadButton = () =>{
        //alert(JSON.stringify(file[0][0]))
        setWaiting(true);
        let parameters = new FormData();

        console.log(file[0][0].name)

        parameters.append("file", file[0][0]);
        parameters.append('id', user[0].toString());
        parameters.append('position', (files.length+1).toString());

        console.log(parameters)

        axios.post(pathstring + '/upload',parameters)
            .then((res) => {

                //alert(JSON.stringify(res.data));
                setFiles(files => [...files, [res.data]]);
                //download(res.data, "testing.pdf", "pdf");
                //fs.writeFile("testing.pdf", res.data);
                setWaiting(false);

           });
    }

    //---------- GET FILES ----------
    const getFiles = () => {
        axios.post(pathstring + '/getFiles',{
                user: user[0].toString(),
            }).then((res) => {

                //alert(JSON.stringify(res.data))
                
                setFiles(res.data);
                setRefreshPage(false);
 
           });
    }

    useEffect(() => {
        if(refreshPage == true && user.length > 0)
            getFiles();
    },[user]);

    return (
        <div className='Background'>
            <div>
                <img src={name} alt="name" style={{width:'70vw', marginTop:'8vh'}} />


                <Button onClick={fileInputClicked} className='Upload-button' variant='contained'>
                    Upload File <input ref={fileInputRef} className='File-input' type="file" onChange={filesSelected} />
                </Button>

                <Button  onClick={handleUploadButton} disabled={file.length > 0 ? false : true} > 
                    <UploadIcon/>
                </Button >

                
            </div>
            {waiting == true
            ? 
            <>
                <Loader/>
            </>
            :
            <FileList files={files} setFiles={setFiles}/>

            }
        </div>
    )
}