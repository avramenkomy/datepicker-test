import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDate from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import 'moment/locale/ru';

export default function ResponsiveDatePickers() {
  const [reportDate, setReportDate] = React.useState(moment());
  const MAX_DATE = moment('3000-01-01');
  const MIN_DATE = moment('1970-01-01');

  return (
    <LocalizationProvider dateAdapter={AdapterDate} locale="ru">
        <DatePicker
          label="Отчетный период сутки"
          value={reportDate}
          maxDate={MAX_DATE}
          minDate={MIN_DATE}
          onChange={(newReportDate) => {
            setReportDate(newReportDate);
          }}
          renderInput={(params) => <TextField size="small" style={{ width: 280 }} {...params} />}
          inputFormat="MM/DD/YYYY"
        />
    </LocalizationProvider>
  );
}
