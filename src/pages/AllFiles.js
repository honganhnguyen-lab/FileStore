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
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import DialogSetName from "./DashBoardCompo/AddButton";
import FolderBreadCrumbs from "./FolderBreadCrumbs";
import { useFolder } from "../hooks/useFolder";
import { useParams, useLocation } from "react-router";
import AddFileButton from "./DashBoardCompo/AddFileButton";

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

  const handleClick = useCallback((event, link) => {
    // prevent context menu from opening on right-click
    event.preventDefault();

    let message;
    
    // synthetic event
    switch (event.type) {
      case 'click':
        return window.open(link)
       
      case 'contextmenu':
        
        return setAnchorEl(event.currentTarget)
    }

    // native event
    switch (event.nativeEvent.button) {
      case 0:
        return window.open(link)
      case 2:
        return setAnchorEl(event.currentTarget)
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

      <DialogSetName open={open} setOpen={setOpen} currentFolder={folder} />

      <Grid container spacing={3}>
        {/* onClick={()=> history.push(`/folder/${item.id}`)} */}
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
                direction="column"
                spacing={1}
                alignItems="center"
                justifyContent="center"
                sx={{
                  minHeight: "12rem",
                  flex: "1 1 18rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  cursor:"pointer"
                }}
                onClick={(e) => {
                    handleClick(e, item.url);
                  }}
                  onContextMenu={(e) => {
                    handleClick(e, item.url);
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

        {childFiles.length > 0 &&
          childFiles.map((item) => (
            <Grid
              item
              md={3}
              xs={3}
              key={item.id}
              onClick={() => history.push(`/folder/${item.id}`)}
            >
              <Stack
                direction="column"
                spacing={1}
                alignItems="center"
                justifyContent="center"
                onClick={(e) => {
                  handleClick(e, item.url);
                }}
                onContextMenu={(e) => {
                  handleClick(e, item.url);
                }}
                sx={{
                  minHeight: "12rem",
                  flex: "1 1 18rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  cursor:"pointer"
                }}
              >
                {isImgLink(item.url) ? (
                  <Box
                    sx={{ width: "100%", height: "150px", objectFit: "cover" }}
                  >
                    <img width="100%" height="100%" src={item.url} />
                  </Box>
                ) : (
                  <DocumentScannerIcon sx={{ fontSize: 40 }} color="primary" />
                )}

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
          <Stack direction="column" spacing={2}>
            <SmallBox>
              <Typography
                variant="caption"
                color="black"
                sx={{ fontWeight: 700, fontSize: "0.875rem" }}
              >
                Open
              </Typography>
            </SmallBox>
            <SmallBox>
              <Typography
                variant="caption"
                color="black"
                sx={{ fontWeight: 700, fontSize: "0.875rem" }}
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
      </Grid>
    </Stack>
  );
};

export default AllFiles;
