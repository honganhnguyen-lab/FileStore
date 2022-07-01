import React from 'react';
import { Grid, Stack } from '@mui/material';
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import AllFiles from './AllFiles';

const Dashboard = () => {
  return (
    <Stack spacing ={2}>
     <Navbar/>
     <Grid container>
       <Grid item xs={2}>
       <Sidebar/>
       </Grid>
       <Grid item xs={9}>
         <AllFiles/>
       </Grid>
     </Grid>
  
     
   
   </Stack>
  )
}

export default Dashboard