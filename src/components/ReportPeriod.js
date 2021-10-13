import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Grid } from '@material-ui/core';

import ReportPeriodSelector from '../elements/ReportPeriodSelector';

const reportPeriods = [
    {id: 4, type: 'day', name: 'Сутки'},
    {id: 3, type: 'week', name: 'Неделя'},
    {id: 2, type: 'month', name: 'Месяц'},
    {id: 5, type: 'quarter', name: 'Квартал'},
    {id: 1, type: 'year', name: 'Год'},
];

function ReportPeriod() {

  const [reportPeriodValue, setReportPeriodValue] = useState(reportPeriods[0]);
  const [type, setType] = useState(reportPeriods[0].type);

  return (
    <Grid container direction='row' spacing={6} style={{marginLeft: '20px'}} alignItems="center">
      <Grid item xs={4}>
      <Autocomplete
        disableClearable        
        onChange={(event, newValue) => {
          setReportPeriodValue(newValue);
          setType(newValue.type);
        }}
        options={reportPeriods}
        value={reportPeriodValue}
        getOptionLabel={option => option.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Тип отчетного периода" variant="outlined" />}
      />
      </Grid>
      <Grid item xs={4}>
        <ReportPeriodSelector type={type} />
      </Grid>     
    </Grid>
  )
}

export default ReportPeriod;