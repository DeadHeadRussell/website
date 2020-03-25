import {createMuiTheme} from '@material-ui/core/styles';
import {green, indigo} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: '#f4f4f4'
    },
    secondary: indigo,
    type: 'light'
  }
});

export default theme;

