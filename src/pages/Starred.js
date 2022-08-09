import React, { useCallback, useState, useEffect } from "react";

import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar';


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

import FolderBreadCrumbs from "./FolderBreadCrumbs";
import { useFolder } from "../hooks/useFolder";
import { useParams, useLocation } from "react-router";

import { database } from "../Firebase";

const Starred = () => {

    const history = useHistory();
    const { folderId } = useParams();
  
    const { state = {} } = useLocation();


  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );


  const filterStarredFolders =
    childFolders.length > 0 &&
    childFolders.filter((item) => item.isStarred === true);
  const filterStarredFiles =
    childFiles.length > 0 && childFiles.filter((item) => item.isStarred === true);
  
    const isImgLink = (url) => {
        if (typeof url !== "string") return false;
        return (
          url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) != null
        );
      };
    
 
    return (
        <Stack spacing ={2}>
         <Navbar/>
         <Grid container>
           <Grid item xs={2}>
           <Sidebar selectedBar="2"/>
           </Grid>
           <Grid item xs={9}>
           <Stack direction="column" spacing={2}>
        <Typography variant="h6" sx={{ textAlign: "left" }}>
          Folders
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: "0px !important" }}>
          {filterStarredFolders.length > 0 &&
            filterStarredFolders.map((item) => (
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
          {filterStarredFiles.length > 0 &&
            filterStarredFiles.map((item) => (
              <Grid item md={3} xs={3} key={item.id}>
                <Stack
                  direction="column"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"

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
 
      </Stack>
           </Grid>
         </Grid>
      
         
       
       </Stack>
      )
  
}

export default Starred