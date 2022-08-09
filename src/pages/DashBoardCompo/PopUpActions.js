import React, { useEffect, useState } from "react";
import {
  experimentalStyled as styled,
  Stack,
  Button,
  Typography,
  Drawer,
  Box,
  ListItem,
  ListItemText,
  ListItemIcon,
  Popover,
  ListItemButton,

  TextField,
  
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';

import { database } from "../../Firebase";


const SmallBox = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  borderRadius: 0,
  justifyContent: "left",
  paddingLeft: theme.spacing(3),
}));

const PopUpActions = ({ openPopper, anchorEl, setAnchorEl, itemData, itemId }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);



  const [open, setOpen] = useState(false);

  const toggleDrawer = (e, open) => {
    setAnchorEl(null);
    setDrawerOpen(open);
    setOpen(false)
  };


  const [nameField, setNameField] = useState('');


  useEffect(()=>{
    setNameField(itemData && itemData.name);
  },[itemData])


  const handleUpdateField = async(data) => {
    if(itemId.isFolder){
      await database.folders
      .doc(`${itemId.id}`)
      .update({name: data})
      
    }else{
    await database.files
    .doc(`${itemId.id}`)
    .update({name: data})
    }
   setOpen(false)
   setDrawerOpen(false)
   

  }

 

 

 const convert = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }


  return (
    <>
      <Popover
        open={openPopper}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        className="popup-button-actions"
      >
        <Stack direction="column" spacing={0.5}>
          <SmallBox>
            <Typography
              variant="caption"
              color="black"
              sx={{ fontWeight: 700, fontSize: "0.875rem" }}
              onClick={() => {
                window.open(itemData && itemData.url)
              }}
            >
              Open
            </Typography>
          </SmallBox>
          <SmallBox>
            <Typography
              variant="caption"
              color="black"
              sx={{ fontWeight: 700, fontSize: "0.875rem" }}
              onClick={(e) => {
                toggleDrawer(e, true);
              }}
            >
              Detail
            </Typography>
          </SmallBox>

          <SmallBox>
            <Typography
              variant="caption"
              color="black"
              sx={{ fontWeight: 700, fontSize: "0.875rem" }}
            >
              Delete
            </Typography>
          </SmallBox>
        </Stack>
      </Popover>
      <Drawer
        open={drawerOpen}
        anchor="right"
        onClose={(e) => {
          toggleDrawer(e, false);
        }}
       
      >
       <Box sx={{width:250, flexDirection: "column"}}>
        <Box sx={{width:'100%', height: "45px", backgroundColor:"#1b3b65",color:"white"}}>
           <Typography variant="h5" textAlign="center" padding={1}>DETAIL</Typography>
        </Box>
       
        <ListItem>
       
          <ListItemButton>

          <ListItemIcon>
            <EditIcon onClick={()=> setOpen(true)}/>
          </ListItemIcon>
          <ListItemText>
            
            { itemData && itemData.name}
          </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem >
          <ListItemText>
            <b>Owner: </b> 
          </ListItemText>
          <ListItemText>
            {itemData && itemData.userId}
          </ListItemText>
        </ListItem>

        <ListItem >
          <ListItemText>
            <b>Create at: </b>
          </ListItemText>
          <ListItemText>
            {itemData && convert(Date(itemData.createAt))}
          </ListItemText>
        </ListItem>

        {open && (
          <Stack direction="column" spacing={2} mt={5}>
            <TextField variant="filled" value={nameField} onChange={(e)=>{setNameField(e.target.value)}}/>

            <Button variant="contained" onClick={()=> handleUpdateField(nameField)}>Change</Button>
          </Stack>
        )}
       </Box>
      </Drawer>

      {/* <Dialog
      open={open}
      onClose={() => setOpen(false)}
      >
        <DialogTitle>Rename Item</DialogTitle>
          <Stack direction="column" spacing={2}>
            <TextField value ={nameField} onChange={(e) => setNameField(e.target.value)}/>
            <Button variant="contained" >Change</Button>
          </Stack>
      </Dialog> */}
    </>
  );
};

export default PopUpActions;
