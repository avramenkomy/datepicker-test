/** Выпадающий список с автодополнением для фильтра */
import React from "react";
import {Box, Grid} from '@material-ui/core';
import moment from "moment"

import SelectWithSearch from './select_with_search';
// import { Data } from "../api";

const Data = {};
Data.listParamsForFiltersMetric = async () => ({
    data: [
        {id: 0, name: 'test 0'},
        {id: 1, name: 'test 1'},
        {id: 2, name: 'test 2'}
    ]
});

Data.listParamsForFiltersRate = async () => ({
    data: [
        {id: 0, name: 'test 0'},
        {id: 1, name: 'test 1'},
        {id: 2, name: 'test 2'}
    ]
});

Data.rate = async () => ({
    data: [
        {id: 0, name: 'test 0'},
        {id: 1, name: 'test 1'},
        {id: 2, name: 'test 2'}
    ]
});

export default function FilterSelect(props) {
  /**
   * Основной выпадающий список для фильтра
   * 
   * Параметры:
   * filter_type - тип фильтра
   * filter_name - наименование фильтра
   * label - Отображаемое название поля
   * filters_data - данные фильтра в котором участвует данный выпадающий список
   * onChange - действие при выборе параметра
   */
  let filter_value = props.filters_data[props.filter_name] || null;

  const apiHandler = async (search_text) => {
    let result = null;
    let options = [];
    if (props.filter_type === 'rate') {
      result = await Data.listParamsForFiltersRate(props.filter_name, search_text);
      options = result.data.map((value, index) => ({ id: index, name: value }));
    }
    else if (props.filter_type === 'metric') {
      result = await Data.listParamsForFiltersMetric(props.filter_name, search_text);
      options = result.data;
    }
    else if (props.filter_type === 'metric_rate') {
      result = await Data.rate(0, 200, search_text, {}, true);
      options = (result && result.data && result.data.content) ? result.data.content : [];
    }
    else {
      throw new Error(`Not found filter type - ${props.filter_type} in FilterSelect`);
    }

    return options;
  }

  const onChange = (_, value) => {
    props.onChange(props.filter_name, value);
  }

  let return_select = null;
  if (props.filter_type === 'metric_rate') {
    const optionSelected = (option, value) => {
      return (
        option && value && option.name === value.name
        && (option.department && value.department && option.department.name === value.department.name)
        && option.rateCode === value.rateCode
        && option.fromDate === value.fromDate
        && option.tillDate === value.tillDate
      );
    }

    return_select = (<SelectWithSearch
      label={props.label}
      value={filter_value}
      apiHandler={apiHandler}
      onChange={onChange}
      getOptionSelected={optionSelected}
      renderOption={(option, props) => {
        let start_date = option.fromDate ? moment(option.fromDate).format('DD.MM.YYYY') : '...';
        let end_date = option.tillDate ? moment(option.tillDate).format('DD.MM.YYYY') : '...';
        return (
          <Box component="li" {...props}>
            <Grid container>
              <Grid item xs={12}><b>{option.name}</b></Grid>
              <Grid item xs={12}>{(option.department ? option.department.name : '-') }</Grid>
              <Grid item xs={4}>{option.rateCode}</Grid>
              <Grid item xs={8}>{start_date} - {end_date}</Grid>
            </Grid>
          </Box>
        )}
      }
    />)
  }
  else {
    return_select = (<SelectWithSearch
      label={props.label}
      value={filter_value}
      apiHandler={apiHandler}
      onChange={onChange}
    />)
  }

  return return_select
}