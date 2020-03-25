import CssBaseline from '@material-ui/core/CssBaseline';
import {
  MuiThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles';
import {JssProvider, SheetsRegistry} from 'react-jss';
import ReactDOMServer from 'react-dom/server';

import theme from './theme';
import Root from './components/root';
import Website from './components/website';

export default function compile(data) {
  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();

  const generateClassName = createGenerateClassName();

  const html = ReactDOMServer.renderToString((
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <CssBaseline />
        <Root jsPath='client.js' cssPath='index.css'>
          <Website data={data} />
        </Root>
      </MuiThemeProvider>
    </JssProvider>
  ));

  const css = sheetsRegistry.toString();

  return {html, css};
}

