import React from 'react';
import { InputBase } from '@material-ui/core'

const TIMEOUT = 1500;

function InputBaseWithWait(props) {
  /** Данная модификация инпута нобходима для ожидания введения искомого слова */
  let input_value_for_wait = null;

  const handleSearch = (event) => {
    const handle_value = event.target.value;
    input_value_for_wait = event.target.value;
    setTimeout(() => {
      if (input_value_for_wait === handle_value) {
        props.onInput(handle_value);
      }
    }, TIMEOUT);
  }

  return (
    <InputBase
      placeholder="Поиск"
      inputProps={{ 'aria-label': 'Поиск' }}
      {...props}
      onInput={handleSearch}
    >
    </InputBase>
  )
}

export default InputBaseWithWait;