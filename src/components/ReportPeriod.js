import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { Grid, TextField } from '@mui/material';

import ReportPeriodSelector from '../elements/ReportPeriodSelector';

const reportPeriods = [
  {id: 4, type: 'day', name: 'Сутки'},
  {id: 3, type: 'week', name: 'Неделя'},
  {id: 2, type: 'month', name: 'Месяц'},
  {id: 5, type: 'quarter', name: 'Квартал'},
  {id: 1, type: 'year', name: 'Год'},
];

function ReportPeriod() {

  const [reportPeriodValue, setReportPeriodValue] = useState(reportPeriods[1]);
  const [type, setType] = useState(reportPeriods[1].type);

  return (
    <Grid container direction="column" spacing={5}>
      <Grid container item xs={12}>
        <Grid item xs={3}>
          <Autocomplete
            disableClearable        
            onChange={(event, newValue) => {
              setReportPeriodValue(newValue);
              setType(newValue.type);
            }}
            options={reportPeriods}
            value={reportPeriodValue}
            getOptionLabel={option => option.name}
            size="small"
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Тип отчетного периода"
                variant="outlined"              
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <ReportPeriodSelector type={type} />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Grid>
  )
}

export default ReportPeriod;