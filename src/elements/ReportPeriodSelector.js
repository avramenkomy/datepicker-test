import React  from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { makeStyles } from '@material-ui/core/styles';

import DayPicker from './DayPicker';
import WeekPicker from './WeekPicker';
import MonthPicker from './MonthPicker';
import YearPicker from './YearPicker';
// import QuarterPicker from './QuarterPicker';
import NewQuarterPicker from './NewQuarterPicker';
  
moment.locale("ru");

const useStyles = makeStyles((theme) => ({
  date_field: {
    width: '100%',
    height: 20,
    marginTop: 0,
    marginBottom: 0,
    '& .MuiInputBase-input': {
      padding: "10px 5px",
    },
  }
}));

function ReportPeriodSelector({type}) {
  const classes = useStyles();

  const dayPicker = type === 'day' ? <DayPicker className={classes.date_field} /> : null;
  const weekPicker = type === 'week' ? <WeekPicker className={classes.date_field} /> : null;
  const monthPicker = type === 'month' ? <MonthPicker className={classes.date_field} /> : null;
  const quarterPicker = type === 'quarter' ? <NewQuarterPicker className={classes.date_field} /> : null;
  const yearPicker = type === 'year' ? <YearPicker className={classes.date_field} /> : null;

  return (
    <React.Fragment>
      {dayPicker}
      {weekPicker}
      {monthPicker}
      {quarterPicker}
      {yearPicker}
    </React.Fragment>
  );
}

export default ReportPeriodSelector;