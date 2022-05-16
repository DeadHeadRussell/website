import {ServerStyleSheets} from '@material-ui/core/styles';
import Document, {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';

import {theme} from '../theme';

export default class RootDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content={theme.palette.primary.main} />
          <meta itemProp='name' content='Lavish Dude' />
          <meta itemProp='description' content="Lavish Dude band website" />
          <meta itemProp='image' content='/profile.jpg' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
          <link rel='icon' type='image/png' href='/favicon.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

RootDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);
  
  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
  };
};

