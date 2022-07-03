import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Stack,Button, Grid, Typography } from '@mui/material';

import FolderIcon from '@mui/icons-material/Folder';
import DialogSetName from './DashBoardCompo/AddButton';
import { useFolder } from '../hooks/useFolder';



const AllFiles = () => {

    const {folder, childFolders} = useFolder("ylLcObxQ1WOABdHlJ9Vu");
   
    console.log(childFolders);



const [open, setOpen] = React.useState(false);


return (
   <Stack direction="column" spacing={2} justifyContent="flex-start" sx={{marginLeft: "30px"}}>
    <Button sx={{width:"220px", border: "1px solid"}} onClick={() => setOpen(true)}>
        + ADD FOLDER
    </Button>

    <DialogSetName open={open} setOpen={setOpen}  currentFolder={folder} />

    <Grid container spacing={3}>
       
        {/* onClick={()=> history.push(`/folder/${item.id}`)} */}
        {childFolders  && childFolders.map((item) => (
        <Grid item md={3} xs={3} key={item.id}  >
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