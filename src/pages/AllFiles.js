import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Stack,Button, Grid, Typography } from '@mui/material';

import FolderIcon from '@mui/icons-material/Folder';
import DialogSetName from './DashBoardCompo/AddButton';
import FolderBreadCrumbs from './FolderBreadCrumbs';
import { useFolder } from '../hooks/useFolder';
import { useParams, useLocation } from 'react-router';



const AllFiles = () => {
const history= useHistory();
const {folderId} = useParams();

const { state = {} } = useLocation();

const {folder, childFolders} = useFolder(folderId, state.folder);
   

const [open, setOpen] = React.useState(false);


return (
   <Stack direction="column" spacing={2} justifyContent="flex-start" sx={{marginLeft: "30px"}}>
    
    <FolderBreadCrumbs currentFolder= {folder}/>
    <Button sx={{width:"220px", border: "1px solid"}} variant="contained" onClick={() => setOpen(true)}>
        + ADD FOLDER
    </Button>

    <DialogSetName open={open} setOpen={setOpen}  currentFolder={folder} />

    <Grid container spacing={3}>
       
        {/* onClick={()=> history.push(`/folder/${item.id}`)} */}
        {childFolders.length >0  && childFolders.map((item) => (
        <Grid item md={3} xs={3} key={item.id} onClick={()=> history.push(`/folder/${item.id}`)}  >
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
            <Typography variant="h6" sx={{maxWidth:"200px", overflow:"hidden", textOverflow: "ellipsis"}}>{item.name}</Typography>
            </Stack>
        </Grid>
         ))} 
    </Grid>
   </Stack>
  )
}

export default AllFiles