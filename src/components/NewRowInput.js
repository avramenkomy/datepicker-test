import React, { useState, useEffect, } from "react";
import { TextField, InputAdornment } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

function RowInput(props) {
  const [value, setValue] = useState(null);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('primary');
  const [errorStatus, setErrorStatus] = useState(false);
  const [interval, setStateInterval] = useState(null);

  const DELAY_FOR_REQUEST = 3000;
  const DELAY_ON_LAST_INPUT = 3;
  let inputInterval = null;
  let counterID = null;

  function validateInput (val) {
    const numberVal = +val;
    if (val === '' || (isNaN(numberVal) && val.length)) {
      return false;
    }
    if (!isNaN(numberVal) && val !== '') {
      return true;
    }
  };

  const handleChangeValue = (e) => {
    const val = e.target.value;
    clearInterval(inputInterval);
  
    if (validateInput(val)) {
      setColor('success');
      setErrorStatus(false);
      setCounter(0);
      inputInterval = setInterval(() => {
        console.log('interval', inputInterval);
      }, 3000);
      console.log('valid input', val);
    } else {
      console.log('invalid input', val);
      setErrorStatus(true);
    }
  }

  return (
    <React.Fragment>
        <TextField
          label="digit"
          variant="filled"
          size="small"
          color={color}
          error={errorStatus}
          disabled={loading}
          onChange={ handleChangeValue }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" style={{ width: 28 }}>                
                {loading && <CircularProgress size={15} />}                
              </InputAdornment>
            ),
          }}
        />
        <div>
          <p>после последнего ввода прошло: {counter} секунд</p>
        </div>
      </React.Fragment>
  )
}

export default RowInput;