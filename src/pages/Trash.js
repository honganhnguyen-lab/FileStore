import React, { useState } from "react";
import {
  Checkbox,
  Table,
  Grid,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box, Button
} from "@mui/material";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

import { useFolder } from "../hooks/useFolder";
import { useParams, useLocation } from "react-router";

import { database } from "../Firebase";

const Trash = () => {
  const { folderId } = useParams();

  const { state = {} } = useLocation();

  const { childFolders, childFiles } = useFolder(folderId, state.folder);
  const trashedFiles =
    childFiles.length > 0 && childFiles.filter((item) => item.isTrash === true);
  const trashedFolders =
    childFolders.length > 0 &&
    childFolders.filter((item) => item.isTrash === true);

  const [array, setArray] = useState({"file": [], "folder": []});

  console.log(array);

  const functionChecked = (id, checked, type) => {
    if (checked) {
        const newValue = [...array[type]];
        newValue.push(id);
  
        setArray({ ...array, [type]: newValue });
      } else {
        const newValue = array[type].filter((item) => item !== id);
        setArray({ ...array, [type]: newValue });
      }
  };

  const handleReset = () =>{

     array["folder"].length > 0 && array["folder"].map((item) => {
         database.folders
        .doc(`${item}`)
        .update({isTrash: false})
    })

        
    array["file"].length > 0 && array["file"].map((item)=>{
         database.files
        .doc(`${item}`)
        .update({isTrash: false})
    })
    setArray({...array, ["file"]: [], ["folder"]: []})
  }

  const handleDelete = () => {
    array["folder"].length > 0 && array["folder"].map((item) => {
        database.folders
       .doc(`${item}`)
       .delete()
   })

       
   array["file"].length > 0 && array["file"].map((item)=>{
        database.files
       .doc(`${item}`)
       .delete()
   })
   setArray({...array, ["file"]: [], ["folder"]: []})
  }

  return (
    <Stack spacing={2}>
      <Navbar />
      <Grid container>
        <Grid item xs={2}>
          <Sidebar selectedBar="3" />
        </Grid>
        <Grid item xs={10}>
            {(array["file"].length + array["folder"].length > 0) && (
                <Box sx={{width:"100%", background: " #3676CB", color: "white", height: "50px"}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" padding="5px">
                        <Typography> Choose {array["file"].length + array["folder"].length} items</Typography>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" color="error" onClick={()=> handleDelete()}>Delete</Button>
                            <Button variant="contained" color="warning" onClick={()=> handleReset()}>Reset</Button>
                        </Stack>
                    </Stack>
                   
                </Box>
            )}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trashedFolders.length > 0 &&
                trashedFolders.map((item) => {
                  const isSelected = array && array[item.type].includes(item.id);
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          value={item.id}
                          onChange={(e) => {
                            functionChecked(e.target.value, e.target.checked, item.type);
                          }}
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.userId}</TableCell>
                      <TableCell>Folder</TableCell>
                    </TableRow>
                  );
                })}

              {trashedFiles.length > 0 &&
                trashedFiles.map((item) => {
                  const isSelected = array && array[item.type].includes(item.id);
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          value={item.id}
                          onChange={(e) => {
                            functionChecked(e.target.value, e.target.checked, item.type);
                          }}
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.userId}</TableCell>
                      <TableCell>File</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Trash;
