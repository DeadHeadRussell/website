import {green, indigo} from '@material-ui/core/colors';
import {createTheme} from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: '#f4f4f4'
    },
    secondary: indigo,
    type: 'light'
  }
});
