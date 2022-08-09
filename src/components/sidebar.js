import React,{useState} from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  experimentalStyled as styled
} from "@mui/material";

import MailIcon from "@mui/icons-material/Mail";
import StarIcon from '@mui/icons-material/Star';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete'
import { useHistory } from 'react-router';

const StyledList = styled(List)(({theme}) => ({
  '&& .Mui-selected, && .Mui-selected:hover': {
    backgroundColor: '#3676cb',
    color:"white"

  },
  // hover states
  '& .MuiListItemButton-root:hover': {
    backgroundColor: 'white',
    '&, & .MuiListItemIcon-root': {
      color: 'blue',
    },
  },

 }))


const ListSideBar = [
  {
  id: '1',
  title:'All Files',
  url: "/",
  icon: <MailIcon/>
  },
  {
    id: '2',
    title: 'Starred',
    url:"/starred",
    icon: <StarIcon/>
  },
  {
    id: '3',
    url: "/delete",
    title: 'Trash',
    icon: <DeleteIcon/>
  }
]

const Sidebar = ({selectedBar}) => {
  let history = useHistory();

  const drawerWidth = '15%';


  const onClickChoose = (url) => {
   
    history.push(url)
  }
  return (
    <Drawer
      sx={{
        width: drawerWidth,

        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          position:'absolute',
          top:'65px',
          background:"#e5f0ff"
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <StyledList sx={{ padding: "20px 0px", fontSize:'16px' }}>
        {ListSideBar.map((item) => (
          <ListItemButton key={item.id} onClick={()=>{onClickChoose(item.url)}} selected={selectedBar === item.id}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </StyledList>
    </Drawer>
  );
};

export default Sidebar;
