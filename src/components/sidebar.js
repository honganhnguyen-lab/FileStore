import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MailIcon from "@mui/icons-material/Mail";
import StarIcon from '@mui/icons-material/Star';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete'


const ListSideBar = [
  {
  title:'All Files',
  icon: <MailIcon/>
  },
  {
    title: 'Starred',
    icon: <StarIcon/>
  },
  {
    title: 'Shared',
    icon: <ShareIcon/>
  },
  {
    title: 'Deleted',
    icon: <DeleteIcon/>
  }
]

const Sidebar = () => {
  const drawerWidth = 240;
  return (
    <Drawer
      sx={{
        width: drawerWidth,

        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          position:'absolute',
          top:'65px'
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List sx={{ paddingTop: "30px", fontSize:'16px' }}>
        {ListSideBar.map((item) => (
          <ListItem button key={item.title}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
