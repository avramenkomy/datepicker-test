import React, { useState } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import "moment/locale/ru";
  
moment.locale("ru");

export default function DayPicker(props) {
    const initDate = new Date();
    const [date, setDate] = useState(initDate);

    const MAX_DATE = new Date('3000-01-01');
    const MIN_DATE = new Date('1970-01-01');

    const defaultParams = {
        inputVariant: "outlined",
        cancelLabel: "Отмена",
        okLabel: "Принять",
        maxDateMessage: "Дата должна быть меньше максимальной",
        minDateMessage: "Дата должна быть больше минимальной",
        invalidDateMessage: "Ошибочный формат ввода",
        minDate: MIN_DATE,
        maxDate: MAX_DATE,
        value: date,
        size: "small",
        style: {
            width: 280
        }
      }

    return (
        <MuiPickersUtilsProvider utils={MomentUtils} locale="ru">
            <KeyboardDatePicker
                {...defaultParams}
                label="Отчетный период сутки"
                format="MM/DD/yyyy"
                onChange={(value) => setDate(value)}
            />
        </MuiPickersUtilsProvider>
    )
}