import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ReportPeriod from './components/ReportPeriod';
import RowInput from './components/RowInput';
import NewRowInput from './components/NewRowInput'
import SelectWithSearch from './components/select_with_search';
import ComboBox from './components/ComboBox';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00264d'
    },
    secondary: {
      main: '#001a33'
    },
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '20px',
  },
}));

const props = {
  label: 'test label',
  value: null,
  // apiHandler: () => { console.log('apiHandler') },
  onChange: (e) => { console.log('onChange', e.target.value) },
  options: ['first', 'Second', 'third']
}

function App() {
  const classes = useStyles();
  
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12}>
          <ReportPeriod />
        </Grid>
        <Grid item xs={2}>
          <RowInput />
        </Grid>
        <Grid item xs={2}>
          <NewRowInput />
        </Grid>
        <Grid item xs={12}>
          <SelectWithSearch {...props}/>
        </Grid>
        <Grid item xs={12}>
          <ComboBox />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
