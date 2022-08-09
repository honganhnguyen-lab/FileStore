import React, { useCallback, useState, useEffect } from "react";
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
import StarIcon from "@mui/icons-material/Star";

import DialogSetName from "./DashBoardCompo/AddButton";
import FolderBreadCrumbs from "./FolderBreadCrumbs";
import { useFolder } from "../hooks/useFolder";
import { useParams, useLocation } from "react-router";
import AddFileButton from "./DashBoardCompo/AddFileButton";

import PopUpActions from "./DashBoardCompo/PopUpActions";
import { database } from "../Firebase";

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

  const [itemId, setItemId] = useState({ id: null, isFolder: false });

  const [open, setOpen] = useState(false);

  const openPopper = Boolean(anchorEl);

  const { state = {} } = useLocation();

  const onClickStarred = async (data) => {
    if (itemId.isFolder) {
      await database.folders.doc(`${itemId.id}`).update({ isStarred: data });
    } else {
      await database.files.doc(`${itemId.id}`).update({ isStarred: data });
    }
  };

  const onClickTrashed = async (data) => {
    if (itemId.isFolder) {
      await database.folders.doc(`${itemId.id}`).update({ isTrash: data });
    } else {
      await database.files.doc(`${itemId.id}`).update({ isTrash: data });
    }
  };

  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  const filterNotTrashedFolders =
    childFolders.length > 0 &&
    childFolders.filter((item) => item.isTrash !== true);
  const filterNotTrashedFiles =
    childFiles.length > 0 && childFiles.filter((item) => item.isTrash !== true);

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
        if (typeOf === "file") {
          setItemId({ id, isFolder: false });
        } else {
          setItemId({ id, isFolder: true });
        }
    }

    // native event
    switch (event.nativeEvent.button) {
      case 0:
        if (typeOf === "file") {
          return window.open(link);
        }
      case 2:
        setAnchorEl(event.currentTarget);
        if (typeOf === "file") {
          setItemId({ id, isFolder: false });
        } else {
          setItemId({ id, isFolder: true });
        }
    }
  }, []);

  const [itemData, setItemData] = useState({});

  const [itemFolder, setItemFolder] = useState({});

  useEffect(async () => {
    await database.files
      .doc(`${itemId.id}`)
      .get()
      .then((snapshot) => setItemData(snapshot.data()));
  }, [itemId]);

  useEffect(async () => {
    await database.folders
      .doc(`${itemId.id}`)
      .get()
      .then((snapshot) => setItemFolder(snapshot.data()));
  }, [itemId]);

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

      <Stack direction="column" spacing={2}>
        <Typography variant="h6" sx={{ textAlign: "left" }}>
          Folders
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: "0px !important" }}>
          {filterNotTrashedFolders.length > 0 &&
            filterNotTrashedFolders.map((item) => (
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
                    handleClick(e, {
                      typeOf: "folder",
                      link: item.url,
                      id: item.id,
                    });
                  }}
                  onContextMenu={(e) => {
                    handleClick(e, {
                      typeOf: "folder",
                      link: item.url,
                      id: item.id,
                    });
                  }}
                >
                  {item.isStarred && (
                    <StarIcon
                      sx={{ position: "absolute", top: 0, right: 0 }}
                      color="warning"
                    />
                  )}
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
          {filterNotTrashedFiles.length > 0 &&
            filterNotTrashedFiles.map((item) => (
              <Grid item md={3} xs={3} key={item.id}>
                <Stack
                  direction="column"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                  onClick={(e) => {
                    handleClick(e, {
                      typeOf: "file",
                      link: item.url,
                      id: item.id,
                    });
                  }}
                  onContextMenu={(e) => {
                    handleClick(e, {
                      typeOf: "file",
                      link: item.url,
                      id: item.id,
                    });
                  }}
                  sx={{
                    maxHeight: "15rem",
                    flex: "1 1 18rem",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                    position: "relative",
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
                    {item.isStarred && (
                      <StarIcon
                        sx={{ position: "absolute", top: 0, right: 0 }}
                        color="warning"
                      />
                    )}
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
        <PopUpActions
          openPopper={openPopper}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          itemData={itemId.isFolder ? itemFolder : itemData}
          itemId={itemId}
          onClickStarred={onClickStarred}
          onClickTrashed={onClickTrashed}
        />
      </Stack>
    </Stack>
  );
};

export default AllFiles;
