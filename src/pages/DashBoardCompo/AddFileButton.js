import React, {useState} from 'react'
import { Button, Typography, Stack } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {storage, database} from "../../Firebase"
import {v4 as uuidV4 } from 'uuid'

import { ROOT_FOLDER } from '../../hooks/useFolder';
import { maxWidth } from '@mui/system';

const AddFileButton = ({currentFolder}) => {
    const [uploadingFiles, setUploadingFiles] = useState([])

    const handleUpload = (e) => {
        const file = e.target.files[0];
       
        if(currentFolder === null || file === null)
            return
        const id =  uuidV4()
        setUploadingFiles(prevUploadingFiles => [...prevUploadingFiles, {id:id, name: file.name, progress: 0, error: false}])

        const filePath = currentFolder === ROOT_FOLDER ? `${currentFolder.path.join("/")}/${file.name}` : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`
        const uploadTask = storage.ref(`/files/Amie29/${filePath}`).put(file)

        uploadTask.on('state_changed', snapshot => {

        }, () => {}, () => {
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
            database.files.add({
              url:url,
              name: file.name,
              createdAt: database.getCurrentTimestamp(),
              folderId: currentFolder.id,
              userId: "Amie29"
            })
          })
        } )
    }
  return (
    <>
    <Button variant="contained" >
        <UploadFileIcon/>
        + ADD FILE
        <input type="file" onChange={handleUpload} style={{opacity: 0, position:"absolute", left:0}} />
    </Button>

    {uploadingFiles.length > 0 && (
      <Stack direction="column" spacing={2} sx={{position: "absolute", bottom: "1rem", right: "1rem", maxWidth: "250px"}}>
        {uploadingFiles.map((file) => {
          <Typography variant="caption">{file.name}</Typography>
          
        })}
        
      </Stack>
    )}
    </>
  )
}

export default AddFileButton