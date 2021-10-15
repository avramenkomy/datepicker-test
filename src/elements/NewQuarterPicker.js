import React, { useState } from 'react';
import { Grid, TextField, Button, IconButton, InputAdornment, Popover } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    // Стили для секции заголовка диалога
    '& .css-bdhsul-MuiTypography-root-MuiDialogTitle-root': {
      background: '#00264D',
      color: 'rgba(255, 255, 255, 0.85)',
    },
  },
  actions_button: {
    color: '#00264D'
  },
  arrow_btn: {
    color: 'rgba(255, 255, 255, 0.85)'
  },
});

export default function QuarterPicker() {
  const classes = useStyles();

  const quarterList = [
    {id: 1, quarterName: '1 кв. Янв-Фев-Мар', start: '01-01', end: '03-31' },
    {id: 2, quarterName: '2 кв. Апр-Май-Июнь', start: '04-01', end: '06-30' },
    {id: 3, quarterName: '3 кв. Июль-Авг-Сен', start: '07-31', end: '09-30' },
    {id: 4, quarterName: '4 кв. Окт-Ноя-Дек', start: '10-01', end: '12-31' },
  ];

  const initYear = (new Date()).getFullYear();
  const [year, setYear] = useState(initYear);
  const [cloneYear, setCloneYear] = useState(year);

  const [reportPeriod, setReportPeriod] = useState(quarterList[0]);
  const [ReportPeriodID, setReportPeriodID] = useState(reportPeriod.id);  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'quarter-picker-popover' : undefined;

  // Скрытие popover окна
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Открываем popover окно
  const handleOpenSelectQuarter = (event) => {
    setAnchorEl(event.currentTarget);
  }  

  // Функции увеличивают или уменьшают значении копии года, которую потом передадим в setYear
  const increment = () => { setCloneYear(cloneYear + 1) };
  const decrement = () => { setCloneYear(cloneYear - 1) };

  // Функция установки значения года и квартала в state
  const handleSetReportPeriod = () => {
    setYear(cloneYear);
    setReportPeriod(quarterList.filter(item => item.id === ReportPeriodID)[0]);
    handleClose();
  }

  // Обработчик кнопок выбора периода, передается ID квартала
  const handleSetReportPeriodID = (event, next) => {    
    if (next !== null) {
      setReportPeriodID(next);
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        label="Отчетный период квартал"
        style={{ width: 280 }}
        size="small"
        onClick={handleOpenSelectQuarter}
        value={`${reportPeriod.quarterName} ${year}`}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <EventIcon color="action" size="small" />
              </IconButton>
            </InputAdornment>
          ),
          readOnly: true,
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3} textAlign="center">
            <IconButton onClick={decrement}><ArrowBackIosIcon/></IconButton>
          </Grid>
          <Grid item xs={6} textAlign="center">
            {cloneYear}
          </Grid>
          <Grid item xs={3} textAlign="center">
            <IconButton onClick={increment}><ArrowForwardIosIcon/></IconButton>
          </Grid>
        </Grid>

        <Grid container>
          <ToggleButtonGroup
            orientation="vertical"
            value={ReportPeriodID}
            fullWidth
            exclusive
            onChange={handleSetReportPeriodID}
          >
            {
              quarterList.map(item => (
                <ToggleButton key={item.id} value={item.id}>
                  {item.quarterName}
                </ToggleButton>
              ))
            }
          </ToggleButtonGroup>
        </Grid>
        
        <Grid container direction="row" alignItems="center" alignContent="center" justifyContent="center">
          <Grid item xs={6} textAlign="center">
            <Button fullWidth className={classes.actions_button} onClick={handleClose}>Отмена</Button>
          </Grid>
          <Grid item xs={6} textAlign="center">
            <Button fullWidth className={classes.actions_button} onClick={handleSetReportPeriod}>Принять</Button>
          </Grid>          
        </Grid>
      </Popover>
    </div>
  );
}
