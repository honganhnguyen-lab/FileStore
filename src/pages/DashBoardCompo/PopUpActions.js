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
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ArticleIcon from "@mui/icons-material/Article";
import { database } from "../../Firebase";

const SmallBox = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  borderRadius: 0,
  justifyContent: "left",
  paddingLeft: theme.spacing(3),
}));

const PopUpActions = ({ openPopper, anchorEl, setAnchorEl, id }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (e, open) => {
    setAnchorEl(null);
    setDrawerOpen(open);
  };

  const [itemData, setItemData] = useState({});

  console.log(itemData)

  useEffect(() => {
    database.files
      .doc(`${id}`)
      .get()
      .then((snapshot) => setItemData(snapshot.data()));
  }, [id]);

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
                console.log(id);
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
              Rename
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
            <FolderIcon/>
          </ListItemIcon>
          <ListItemText>
            {itemData.name}
          </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem >
          <ListItemText>
            Ngay tao
          </ListItemText>
          <ListItemText>
            12/03/2020
          </ListItemText>
        </ListItem>
       </Box>
      </Drawer>
    </>
  );
};

export default PopUpActions;
