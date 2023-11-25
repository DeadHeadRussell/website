import {createTheme} from '@material-ui/core/styles';

import {conf} from '../data';


export const theme = createTheme({
  palette: {
    primary: {
      main: conf.theme.primary,
      contrastText: conf.theme.contrast
    },
    secondary: {
      main: conf.theme.secondary
    },
    background: {
      paper: conf.theme.grey,
      default: conf.theme.contrast
    },
    type: 'light'
  },
  typography: {
    fontFamily: 'Questrial'
  },
  overrides: {
    MuiTableCell: {
      root: {
        borderBottomColor: conf.theme.primary
      }
    }
  }
});
