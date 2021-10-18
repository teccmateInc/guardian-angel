import React from 'react';

import DatePicker from 'react-native-date-picker';

const DatePickerInput = props => {
  const {value, onChange} = props;
  return (
    <DatePicker
      style={{justifyContent: 'center', alignSelf: 'center'}}
      mode="date"
      date={value}
      maximumDate={new Date()}
      minimumDate={new Date('1900-01-01')}
      onDateChange={onChange}
    />
  );
};

export default DatePickerInput;
