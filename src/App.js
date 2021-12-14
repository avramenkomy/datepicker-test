import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ReportPeriod from './components/ReportPeriod';
import RowInput from './components/RowInput';
import NewRowInput from './components/NewRowInput';
import FilterSelect from './components/filter_select';
import InputBaseWithWait from './components/input_base_with_wait';
import SiteBackdrop from './components/backdrop';

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
  filter_type: 'metric',
  filter_name: 'ORG_UNIT_NAME',
  label: 'Признак организации',
  filters_data: {},
  onChange: (type, value) => {
    console.log('onChange', type, value)
  }
}

const onInput = () => { console.log('onInput') }

function App() {
  const classes = useStyles();
  
  return (
    <ThemeProvider theme={theme}>
      <SiteBackdrop open_state={true} />
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
          <FilterSelect {...props}/>
        </Grid>
        <Grid item xs={12}>
          <InputBaseWithWait onInput={onInput} placeholder="Поиск" inputProps={{ 'aria-label': 'Поиск' }}/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
