import React, { useState } from 'react';
import DatePicker from './elements/datepicker';

function App() {
  const [ date, setDate ] = useState(null);
  return (
    <div className="App">
      <DatePicker
        label="Дата до"            
        onChange = {(value)=>{setDate(value)}}
        value = {date}
      />
    </div>
  );
}

export default App;
