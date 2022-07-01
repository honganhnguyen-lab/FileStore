import React, {useState} from 'react';
import {addDoc} from "@firebase/firestore"

import {Dialog,DialogTitle, DialogContent, DialogActions, TextField, Button} from "@mui/material";
import { database } from '../../Firebase';


const DialogSetName = ({open, setOpen}) => {

    const [nameNewFolder, setNameNewFolder] = useState('');

    const handleSubmit = () => {
       //Create a folder in the database
        addDoc(database.folders, {name:nameNewFolder})

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