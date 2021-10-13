import clsx from "clsx";
import React, { Component } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { createStyles } from "@material-ui/styles";
import moment from "moment"
import "moment/locale/ru";

import { IconButton, withStyles } from "@material-ui/core";

class WeekPicker extends Component {
  state = {
    selectedDate: new Date(),
  };

  handleWeekChange = date => {
    this.setState({ selectedDate: moment(date).startOf('isoWeek') });
  };

  renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {

    const { classes } = this.props;
    let dateClone = date;
    let selectedDateClone = selectedDate;

    const start = moment(selectedDateClone).startOf('isoWeek');
    const end = moment(selectedDateClone).endOf('isoWeek');

    const isLastDay = moment(dateClone).isSame(end);
    const dayIsBetween = moment(dateClone).isBetween(start, end);
    const isFirstDay = moment(dateClone).isSame(start);

    const selectEnd = moment(selectedDateClone).endOf('isoWeek');
    const dateEnd = moment(dateClone).endOf('isoWeek');
    console.log('selectEnd', selectEnd);
    console.log('dateEnd', dateEnd);

    console.log('selectEnd', selectEnd);
    console.log('dateEnd', dateEnd);
    

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
      <KeyboardDatePicker
        label="Отчетный период неделя"
        inputVariant="outlined"
        format="MM/DD/yyyy"
        value={selectedDate}
        onChange={this.handleWeekChange}
        renderDay={this.renderWrappedWeekDay}
        margin="normal"
      />
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
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  },
  endHighlight: {
    extend: "highlight",
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  },
}));

export default withStyles(styles)(WeekPicker);