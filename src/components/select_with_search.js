/** Select с текстовым поиском
  Это стандартный элемент material-ui который принимает все параметры но имеет особенность:
  apiHandler - это параметр который принимает функцию,
  которая должна получить по каким либо способом данные и подготовить их для передачи в виде списка options 
  (это массив из обектов с параметром id, name)


  !!!ВНИМАНИЕ!!! это универсалная обёртка для Autocomplete тут модификации производить только по острой необходимости и которые для всех элеметов этого типа сразу.
  Для уникальных компонентов создавать потомка этого компонента.
 */

import React, { useState } from 'react';
import {
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { CircularProgress } from '@material-ui/core'

import { isFunction, isString } from '../tackles';

const StyledAutocomplete = withStyles(() => ({
  root: {
    width: '100%',
  },
}))(Autocomplete);


function SelectWithSearch(props) {
  console.log('props from select', props);
  const { ...rest_props } = props;

  let init_options = Array.isArray(props.options) ? props.options : [];
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(init_options);
  const [value, setValue] = useState(props.value);

  if (!props.apiHandler && !Array.isArray(props.options)) {
    console.warn('Please give to SelectWithSearch apiHandler or options!');
  }

  let onInputChangeHandler = null;
  let search_value = null;
  if (props.apiHandler) {
    onInputChangeHandler = async (event, value, reason) => {
      search_value = value;
      setLoading(true);
      setTimeout(async ()=>{
        if (value === search_value) {
          let result_options = await props.apiHandler(search_value);
          result_options = Array.isArray(result_options) ? result_options : [];
          search_value = null;
          setOptions(result_options);
          setLoading(false);
        }
      }, 1500);
      if (isFunction(props.onInputChange)) {
        props.onInputChange(event, value, reason);
      }
    }
  }
  else {
    onInputChangeHandler = props.onInputChange;
  }

  const onOpenHandler = async () => {
    if (props.apiHandler) {
      let start_saerch_text = null;
      if (isString(value)) {
        start_saerch_text = value
      }
      else {
        start_saerch_text = value ? value.name : null;
      }
      setLoading(true);
      let result_options = await props.apiHandler(start_saerch_text);
      result_options = Array.isArray(result_options) ? result_options : [];
      setOptions(result_options);
      setLoading(false);
    }
  };

  const onChange = (...parameters) => {
    let change_value = parameters[1];
    setValue(change_value);
    if (props.onChange) {
      props.onChange(...parameters);
    }
  }

  const returnLabelNameFromOption = (option) => {
    if (isString(option)) {
      return option;
    }
    else {
      let return_name = option ? option.name : '';
      return return_name;
    }
  }

  const optionSelected = (option, value) => {
    let option_name = option && option.name ? option.name : null;
    let value_name = value && value.name ? value.name : null;
    return option_name && value_name && option_name === value_name;
  }

  return (
    <StyledAutocomplete
      loadingText="Загрузка..."
      noOptionsText="Не найдено"
      closeText="Закрыть"
      clearText="Очистить"
      getOptionLabel={returnLabelNameFromOption}
      onOpen={onOpenHandler}
      getOptionSelected={optionSelected}
      filterOptions={(options)=> {
        return options ? options : [];
      }}
      renderInput={(params) => (
        <TextField {...params} 
          label={props.label}
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      {...rest_props}
      value={value}
      options={options}
      onInputChange={onInputChangeHandler}
      onChange={onChange}
    />
  )
}

export default SelectWithSearch;