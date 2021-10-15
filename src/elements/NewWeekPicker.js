import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ru from 'date-fns/locale/ru';
import DatePicker from '@mui/lab/DatePicker';
import PickersDay from '@mui/lab/PickersDay';
import isSameDay from 'date-fns/isSameDay';
import startOfWeek from 'date-fns/startOfISOWeek';
import endOfWeek from 'date-fns/endOfISOWeek';
import isWithinInterval from 'date-fns/isWithinInterval';

// import moment from 'moment';
// import MomentUtils from '@date-io/moment';
// import 'moment/locale/ru';
// import AdapterDateMoment from '@mui/lab/AdapterMoment';
// import 'moment/locale/ru';

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({

  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),

  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),

  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

export default function WeekPicker() {
  const MAX_DATE = new Date('3000-01-01');
  const MIN_DATE = new Date('1970-01-01');

  const [value, setValue] = React.useState(new Date());

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = startOfWeek(value);
    const end = endOfWeek(value);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    // const start = moment(value).startOf('isoWeek');
    // const end = moment(value).endOf('isoWeek');

    // const dayIsBetween = moment(date).isBetween(start, end);
    // const isFirstDay = moment(date).isSame(start, 'day');
    // const isLastDay = moment(date).isSame(end, 'day');

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    // <LocalizationProvider dateAdapter={AdapterDateMoment} locale="ru">
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
      <DatePicker
        label="Отчетный период неделя"
        value={startOfWeek(value)}
        // value={moment(value).startOf('isoWeek')}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        cancelText="Отмена"
        okText="Принять"
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField style={{ width: 280 }} size="small" {...params} />}
        inputFormat="MM/dd/yyyy"        
      />
    </LocalizationProvider>
  );
}
