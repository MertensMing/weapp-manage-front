import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/lib/date-picker/style/css';

import { DatePicker } from 'antd';

function onChange(date, dateString) {
  console.log(date, dateString);
}


ReactDOM.render(<DatePicker onChange={onChange} />, document.getElementById('usoccer-admin-app'));