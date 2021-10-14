import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment,
  Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


function QuarterPicker() {
  const quarterList = [
    {id: 1, quarterName: '1 кв. Янв-Фев-Мар', start: '01-01', end: '03-31' },
    {id: 2, quarterName: '2 кв. Апр-Май-Июнь', start: '04-01', end: '06-30' },
    {id: 3, quarterName: '3 кв. Июль-Авг-Сен', start: '07-31', end: '09-30' },
    {id: 4, quarterName: '4 кв. Окт-Ноя-Дек', start: '10-01', end: '12-31' },
  ];

  const [openSelectQuarter, setOpenSelectQuarter] = useState(false);
  const [reportPeriod, setReportPeriod] = useState(quarterList[0]);
  const [ReportPeriodID, setReportPeriodID] = useState(reportPeriod.id);

  const initYear = (new Date()).getFullYear();
  const [year, setYear] = useState(initYear);
  const [cloneYear, setCloneYear] = useState(year);

  // Открытие диалогового окна с селектором кварталов
  const handleOpenSelectQuarter = () => {
    setOpenSelectQuarter(true);
  };

  // Функция установки значения года и квартала в state
  const handleSetReportPeriod = () => {
    setYear(cloneYear);
    setReportPeriod(quarterList.filter(item => item.id === ReportPeriodID)[0]);
    setOpenSelectQuarter(false);
  }

  // Обработчик кнопок выбора периода, передается ID квартала
  const handleSetReportPeriodID = (event, next) => {    
    if (next !== null) {
      setReportPeriodID(next);
    }
  };

  // Функции увеличивают или уменьшают значении копии года, которую потом передадим в setYear
  const increment = () => { setCloneYear(cloneYear + 1) };
  const decrement = () => { setCloneYear(cloneYear - 1) };


  return (
    <React.Fragment>
      <Dialog open={openSelectQuarter} onClose={() => setOpenSelectQuarter(false)}>

        <DialogTitle>
          <IconButton onClick={decrement}><ArrowBackIosIcon/></IconButton>
          {cloneYear}
          <IconButton onClick={increment}><ArrowForwardIosIcon/></IconButton>
        </DialogTitle>

        <DialogContent dividers>
        <ToggleButtonGroup
            orientation="vertical"
            value={ReportPeriodID}
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
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenSelectQuarter(false)}>Отмена</Button>
          <Button onClick={handleSetReportPeriod}>Принять</Button>
        </DialogActions>

      </Dialog>

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
    </React.Fragment>
  )
}

export default QuarterPicker;