import {createTheme} from '@material-ui/core/styles';

import conf from '../conf.json';


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
      paper: '#e4e4e4',
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
