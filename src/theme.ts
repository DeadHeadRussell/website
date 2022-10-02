import {createTheme} from '@material-ui/core/styles';

const primaryBrown = '#52250b';

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryBrown,
      contrastText: '#e3deac'
    },
    secondary: {
      main: '#de8bd8'
    },
    background: {
      paper: '#e4e4e4',
      default: '#e3deac'
    },
    type: 'light'
  },
  typography: {
    fontFamily: 'Questrial'
  },
  overrides: {
    MuiTableCell: {
      root: {
        borderBottomColor: primaryBrown
      }
    }
  }
});
