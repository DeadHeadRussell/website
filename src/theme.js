import {green, indigo} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: '#f4f4f4'
    },
    secondary: indigo,
    type: 'light'
  }
});
