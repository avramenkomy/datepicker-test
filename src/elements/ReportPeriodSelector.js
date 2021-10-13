import React, { useState } from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from "moment"
import MomentUtils from '@date-io/moment';
import "moment/locale/ru";
import WeekPicker from './WeekPicker';
import QuarterPicker from './QuarterPicker'
  
moment.locale("ru");

function ReportPeriodSelector({type}) {

  const initDate = new Date();

  const [date, setDate] = useState(initDate);

  const MAX_DATE = new Date('3000-01-01');
  const MIN_DATE = new Date('1970-01-01');

  const defaultParams = {
    inputVariant: "outlined",
    margin: "normal",
    cancelLabel: "Отмена",
    okLabel: "Принять",
    maxDateMessage: "Дата должна быть меньше максимальной",
    minDateMessage: "Дата должна быть больше минимальной",
    invalidDateMessage: "Ошибочный формат ввода",
    minDate: MIN_DATE,
    maxDate: MAX_DATE,
    value: date,
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale="ru">
      {/* селектор с выбором даты */}
      <KeyboardDatePicker
        {...defaultParams}
        label="Отчетный период сутки"
        format="MM/DD/yyyy"
        onChange={(value) => setDate(value)}
      />

      {/* селектор с выбором недели */}
      <WeekPicker />


      {/* селектор с выбором месяца */}
      <KeyboardDatePicker
        {...defaultParams}
        label="Отчетный период месяц"
        views={["month"]}
        format="MM/yyyy"
        onChange={(value) => setDate(value)}
      />

      {/* селектор с выбором квартала */}
      <QuarterPicker />

      {/* селектор с выбором года */}
      <KeyboardDatePicker
        {...defaultParams}
        label="Отчетный период год"
        views={["year"]}
      />
    </MuiPickersUtilsProvider>
  );
}

export default ReportPeriodSelector;