import React from 'react';
import {Stack, Breadcrumbs,Typography} from "@mui/material"
import { Link } from 'react-router-dom';
import { ROOT_FOLDER } from '../hooks/useFolder';


const FolderBreadCrumbs = ({currentFolder}) => {

  let newpath = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]

  if(currentFolder){
    newpath = [...newpath, ...currentFolder.path]
  }


  return (
   <Breadcrumbs>
   {newpath.map((folder, index) => (
    
    <Link  
    key={folder.id} 
    
    to= {{
        pathname: folder.id ? `/folder/${folder.id}` : "/",
        state: { folder: { ...folder, path: newpath.slice(1, index) } },
    }}
 
    
    >
    <Typography sx={{fontSize: "20px", fontStyle: "underline", color: "#1976d2"}}>
    {folder.name}
    </Typography>
    
   
    </Link>
  
   ))}

   {currentFolder && (
    <Typography key={currentFolder.name} underline="hover"  sx={{fontSize: "20px", color: "blue", cursor: "pointer"}}>{currentFolder.name}</Typography>
   )}

  </Breadcrumbs>
  )
}

export default FolderBreadCrumbs