import React, { Component } from 'react';
import clsx from 'clsx';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { createStyles } from '@material-ui/styles';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import "moment/locale/ru";

import { IconButton, withStyles } from '@material-ui/core';

class WeekPicker extends Component {
  state = {
    selectedDate: new Date(),
  };

  MAX_DATE = new Date('3000-01-01');
  MIN_DATE = new Date('1970-01-01');

  handleWeekChange = date => {
    this.setState({ selectedDate: moment(date).startOf('isoWeek') });
  };

  renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
    const { classes } = this.props;
    let dateClone = date;
    let selectedDateClone = selectedDate;
    

    const start = moment(selectedDateClone).startOf('isoWeek');
    const end = moment(selectedDateClone).endOf('week');

    const dayIsBetween = moment(dateClone).isBetween(start, end);
    const isFirstDay = moment(dateClone).isSame(start);
    const isLastDay = moment(dateClone).isSame(end);

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    });

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });
    

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {moment(dateClone).get('date')} </span>
        </IconButton>
      </div>
    );
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={MomentUtils} locale="ru">
        <KeyboardDatePicker
          label="Отчетный период неделя"
          inputVariant="outlined"
          cancelLabel="Отмена"
          okLabel="Принять"
          maxDateMessage="Дата должна быть меньше максимальной"
          minDateMessage="Дата должна быть больше минимальной"
          invalidDateMessage="Ошибочный формат ввода"
          minDate={this.MIN_DATE}
          maxDate={this.MAX_DATE}
          format="MM/DD/yyyy"
          value={selectedDate}
          onChange={this.handleWeekChange}
          renderDay={this.renderWrappedWeekDay}
          style={{ width: 280 }}
          size="small"
        />
      </MuiPickersUtilsProvider>
    );
  }
}

const styles = createStyles(theme => ({
  dayWrapper: {
    position: "relative",
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: "0 2px",
    color: "inherit",
  },
  customDayHighlight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "2px",
    right: "2px",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "50%",
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: "#676767",
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  firstHighlight: {
    extend: "highlight",
    color: theme.palette.common.white,
    background: theme.palette.primary.main,
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  },
  endHighlight: {
    extend: "highlight",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  },
}));

export default withStyles(styles)(WeekPicker);