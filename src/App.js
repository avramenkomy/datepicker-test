import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReportPeriod from './components/ReportPeriod';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '20px',
  },
}));

function App() {
  const classes = useStyles();
  
  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12}>
        <ReportPeriod />
      </Grid>
    </Grid>    
  );
}

export default App;
