import React from 'react'
import { Button } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {storage, database} from "../../Firebase"

import { ROOT_FOLDER } from '../../hooks/useFolder';

const AddFileButton = ({currentFolder}) => {
    const handleUpload = (e) => {
        const file = e.target.files[0];
       
        if(currentFolder === null || file === null)
            return

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
    <Button variant="contained" >
        <UploadFileIcon/>
        + ADD FILE
        <input type="file" onChange={handleUpload} style={{opacity: 0, position:"absolute", left:0}} />
    </Button>
  )
}

export default AddFileButton