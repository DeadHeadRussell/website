import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import Head from 'next/head';
import {FC, ReactNode} from 'react';

import {theme} from '../theme';
import {App, AppProps} from './app';


interface RootProps extends AppProps {
  title?: string;
  children: ReactNode;
}

export const Root: FC<RootProps> = ({title, children, ...appProps}) => (
  <>
    <CssBaseline />
    <Head>
      <title>{title ? (title + ' - ') : ''}Andrew Russell</title>
    </Head>
    <ThemeProvider theme={theme}>
      <App {...appProps}>
        {children}
      </App>
    </ThemeProvider>
  </>
);

