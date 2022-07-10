import React, {useState} from 'react';

import {Dialog,DialogTitle, DialogContent, DialogActions, TextField, Button} from "@mui/material";
import { database } from '../../Firebase';
import { ROOT_FOLDER } from '../../hooks/useFolder';


const DialogSetName = ({open, setOpen, currentFolder}) => {


    const [nameNewFolder, setNameNewFolder] = useState('');

    const handleSubmit = () => {

      if(currentFolder == null) return
      
        const path = [...currentFolder.path]
        if( currentFolder !== ROOT_FOLDER) {
          path.push({name: currentFolder.name, id: currentFolder.id})
        }

        database.folders.add({
          name: nameNewFolder,
          parentId: currentFolder.id,
          userId:  "Amie29",
          path: path,
          createdAt: database.getCurrentTimestamp(),
        })
        setNameNewFolder('')

        setOpen(false);
      };

    
    return (
        <Dialog
        open={open}
        onClose={()=>{setOpen(false)}}
        fullWidth
        maxWidth="xs"
        sx={{alignItems:"center", justifyContent: "center"}}

      >
        
        <DialogTitle sx={{justifyContent:"center", fontSize: "2rem", textAlign:"center"}} >
          Type the Folder name
        </DialogTitle>
        <DialogContent>

        <TextField 
            id="outlined-basic" 
            variant="outlined" 
            placeholder='Name of folder' 
            fullWidth 
            value={nameNewFolder} 
            onChange={(e) => setNameNewFolder(e.target.value)}
        />

        </DialogContent>
        <DialogActions sx={{justifyContent: "center"}}>
        <Button 
            onClick={handleSubmit} 
            autoFocus 
            variant="contained" 
            sx={{width:'50%', paddingBottom: "5px"}}
            disabled ={nameNewFolder === '' }
            >
            Create Folder
          </Button>
        </DialogActions>
         
      </Dialog>
    )
}

export default DialogSetName