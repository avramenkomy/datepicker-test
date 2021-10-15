import React from 'react';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MomentAdapter from '@mui/lab/AdapterMoment';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export default function ViewsDatePicker() {
  const [reportPeriod, setReportPeriod] = React.useState(moment());
  const MAX_DATE = moment('2100-01-01');
  const MIN_DATE = moment('1970-01-01');

  return (
    <LocalizationProvider dateAdapter={MomentAdapter} locale="ru">
      <DatePicker
        views={['year', 'month']}
        openTo="month"
        label="Отчетный период месяц"
        maxDate={MAX_DATE}
        minDate={MIN_DATE}
        value={reportPeriod}
        onChange={(newReportPeriod) => {
          setReportPeriod(newReportPeriod);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ width: '280px' }}
            size="small"
          />
        )}
      />      
    </LocalizationProvider>
  );
}
