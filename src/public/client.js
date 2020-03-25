import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';

import data from './data';
import theme from './theme';
import Website from './components/website';

ReactDOM.hydrate((
  <MuiThemeProvider theme={theme}>
    <Website data={data} />
  </MuiThemeProvider>
), document.getElementById('root'));

