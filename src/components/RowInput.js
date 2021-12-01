import React, { useState, useEffect, } from "react";
import { TextField, InputAdornment } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

class RowInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    	value: '',
      counter: 0,
      delayOnLastInput: 3,
      delayForRequest: 3000,
      loading: false,
      color: 'primary',
      errorStatus: false,
    }
    this.inputInterval = null;
  }

  validateInput (val) {
    const numberVal = +val;
    if (val === '' || (isNaN(numberVal) && val.length)) {
      return false;
    }
    if (!isNaN(numberVal) && val !== '') {
      return true;
    }
  };

  handleChangeValue(e) {
    const val = e.target.value;
    clearInterval(this.inputInterval);

    if (this.validateInput(val)) {
      this.setState({
        counter: 0,
        color: 'success',
        errorStatus: false,
      });      
      this.inputInterval = null;
      this.inputInterval = setInterval(() => {
        if (this.state.counter === this.state.delayOnLastInput) {
          clearInterval(this.inputInterval);
          this.setState({
            loading: true
          });
          console.log("Отправка запроса");
          setTimeout(() => {
            this.setState({
              loading: false
            });
          }, 3000);
        } else {
          this.setState({
            counter: this.state.counter + 1
          });
        }
      }, 1000);
      this.setState({
        value: val
      });
    } else {
      this.setState({ errorStatus: true })
    }
    this.setState({
      value: val
    });
  }

  render() {
    return (
      <React.Fragment>
        <TextField
          label="digit"
          variant="filled"
          size="small"
          color={this.state.color}
          error={this.state.errorStatus}
          value={this.value}
          disabled={this.state.loading}
          onChange={this.handleChangeValue.bind(this)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" style={{ width: 28 }}>                
                {this.state.loading && <CircularProgress size={15} />}                
              </InputAdornment>
            ),
          }}
        />
        <div>
          <p>после последнего ввода прошло: {this.state.counter} секунд</p>
        </div>
      </React.Fragment>
    );
  } 
}

export default RowInput;
