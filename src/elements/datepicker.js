/** Селектор даты */

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
  } from '@material-ui/pickers';
  import moment from "moment"
  import MomentUtils from '@date-io/moment';
  import "moment/locale/ru";
    
  moment.locale("ru");
  
  const MAX_DATE = new Date('9999-01-01');
  const MIN_DATE = new Date('1970-01-01');
  
  
  export default function DatePickerElement(props) {
    /** Элемент даты. Стилизованная и подготовленная обёртка KeyboardDatePicker и принимает те же самые параметры*/
    return (
      <MuiPickersUtilsProvider utils={MomentUtils} locale="ru">
        <KeyboardDatePicker
          disableToolbar
          inputVariant="outlined"
          format="DD/MM/yyyy"
          margin="normal"
          maxDateMessage="Дата должна быть меньше максимальной"
          minDateMessage="Дата должна быть больше минимальной"
          invalidDateMessage="Ошибочный формат даты"
          cancelLabel="Отмена"
          okLabel="Принять"
          {...props}
          maxDate={(props.maxDate ? props.maxDate : MAX_DATE)}
          minDate={(props.minDate ? props.minDate : MIN_DATE)}
        />
      </MuiPickersUtilsProvider>
    )
  }