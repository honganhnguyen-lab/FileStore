import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import {
  experimentalStyled as styled,
  Stack,
  Button,
  Grid,
  Typography,
  Link,
  Box,
  Popover,
} from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import ArticleIcon from "@mui/icons-material/Article";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DialogSetName from "./DashBoardCompo/AddButton";
import FolderBreadCrumbs from "./FolderBreadCrumbs";
import { useFolder } from "../hooks/useFolder";
import { useParams, useLocation } from "react-router";
import AddFileButton from "./DashBoardCompo/AddFileButton";

import PopUpActions from "./DashBoardCompo/PopUpActions";

const SmallBox = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  borderRadius: 0,
  justifyContent: "left",
  paddingLeft: theme.spacing(3),
}));

const AllFiles = () => {
  const history = useHistory();
  const { folderId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);

  const [itemId, setItemId] = useState(null)

  const [open, setOpen] = useState(false);

  const openPopper = Boolean(anchorEl);

  const { state = {} } = useLocation();

  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  const isImgLink = (url) => {
    if (typeof url !== "string") return false;
    return (
      url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) != null
    );
  };

  const handleClick = useCallback((event, { typeOf, link, id }) => {
    // prevent context menu from opening on right-click
    event.preventDefault();

    let message;

    // synthetic event
    switch (event.type) {
      case "click":
        if (typeOf === "file") {
          return window.open(link);
        }

      case "contextmenu":
         setAnchorEl(event.currentTarget);
         setItemId(id)
      
    }

    // native event
    switch (event.nativeEvent.button) {
      case 0:
        if (typeOf === "file") {
          return window.open(link);
        }
      case 2:
         setAnchorEl(event.currentTarget);
         setItemId(id)
    }
  }, []);

  return (
    <Stack
      direction="column"
      spacing={2}
      justifyContent="flex-start"
      sx={{ marginLeft: "30px" }}
    >
      <FolderBreadCrumbs currentFolder={folder} />
      <Stack direction="row" spacing={2}>
        <Button
          sx={{ width: "220px", border: "1px solid" }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          + ADD FOLDER
        </Button>
        <AddFileButton currentFolder={folder} />
      </Stack>

      

      <Stack direction="column" spacing={2}>
        <Typography variant="h6" sx={{ textAlign: "left" }}>
          Folders
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: "0px !important" }}>
          {childFolders.length > 0 &&
            childFolders.map((item) => (
              <Grid
                item
                md={3}
                xs={3}
                key={item.id}
                onClick={() => history.push(`/folder/${item.id}`)}
                sx={{ cursor: "pointer" }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    minHeight: "4rem",
                    flex: "1 1 18rem",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={(e) => {
                    handleClick(e, { typeOf: "folder", link: item.url, id:item.id });
                  }}
                  onContextMenu={(e) => {
                    handleClick(e, { typeOf: "folder", link: item.url, id:item.id });
                  }}
                >
                  <FolderIcon sx={{ fontSize: 40 }} color="primary" />
                  <Typography
                    variant="h6"
                    sx={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </Typography>

                </Stack>
              </Grid>
            ))}
        </Grid>

        <Typography variant="h6" sx={{ textAlign: "left" }}>
          Files
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: "0px !important" }}>
          {childFiles.length > 0 &&
            childFiles.map((item) => (
              <Grid item md={3} xs={3} key={item.id}>
                <Stack
                  direction="column"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                  onClick={(e) => {
                    handleClick(e, { typeOf: "file", link: item.url, id: item.id });
                  }}
                  onContextMenu={(e) => {
                    handleClick(e, { typeOf: "file", link: item.url, id: item.id });
                  }}
                  sx={{
                    maxHeight: "15rem",
                    flex: "1 1 18rem",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      justifyContent: "center",
                    }}
                  >
                    {isImgLink(item.url) ? (
                      <img width="100%" height="100%" src={item.url} />
                    ) : (
                      <ArticleIcon
                        sx={{ width: "100%", height: "150px" }}
                        color="primary"
                      />
                    )}
                  </Box>
                  <Box
                    sx={{ width: "100%", height: "30px", overflow: "hidden" }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        maxWidth: "100%",
                        paddingLeft: "5px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "center",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Stack>

              </Grid>
            ))}
        </Grid>
        <PopUpActions openPopper={openPopper} anchorEl={anchorEl} setAnchorEl={setAnchorEl} id={itemId}/>


      </Stack>
    </Stack>
  );
};

export default AllFiles;
