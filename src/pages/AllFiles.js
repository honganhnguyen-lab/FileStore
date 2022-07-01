import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Stack,Button, Grid, Typography } from '@mui/material';

import FolderIcon from '@mui/icons-material/Folder';
import DialogSetName from './DashBoardCompo/AddButton';



const AllFiles = () => {
    const [listFolder, setListFolder] = useState([])
    let history = useHistory();

const getListFolders = async()=>{ 
        await axios.get("http://localhost:3002/folders")
       .then(res => {
           setListFolder(res.data)
       }
       ).catch((error) =>{
           console.log(error);
         
       }
     
)}



const addNewFolders = async(name) => {
    await axios.post("http://localhost:3002/folders", {name})
    .then(res => {
        console.log(res);
        console.log(res.data);
      })

}

useEffect(() => {
    getListFolders()
}, [])



const [open, setOpen] = React.useState(false);


return (
   <Stack direction="column" spacing={2} justifyContent="flex-start" sx={{marginLeft: "30px"}}>
    <Button sx={{width:"220px", border: "1px solid"}} onClick={() => setOpen(true)}>
        + ADD FOLDER
    </Button>

    <DialogSetName open={open} setOpen={setOpen}  addNewFolders={addNewFolders}/>

    <Grid container spacing={3}>
        {listFolder.map((item) => (
        <Grid item md={3} xs={3} key={item.id} onClick={()=> history.push(`/folder/${item.id}`)} >
            <Stack 
            direction="column" 
            spacing={1} 
            alignItems="center" 
            justifyContent="center" 
            sx={{
                minHeight: '12rem',
                flex:'1 1 18rem',
                border: '1px solid #ddd',
                borderRadius: '8px'
            }}>
            <FolderIcon sx={{ fontSize: 40 }} color="primary"/>
            <Typography variant="h6">{item.name}</Typography>
            </Stack>
        </Grid>
         ))} 
    </Grid>
   </Stack>
  )
}

export default AllFiles