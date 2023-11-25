import {ServerStyleSheets} from '@material-ui/core/styles';
import Document, {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';

import {conf} from '../../data';
import {theme} from '../theme';
import {staticLink} from '../utils';

export default class RootDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content={theme.palette.primary.main} />
          <meta itemProp='name' content={conf.band.name} />
          <meta itemProp='description' content={conf.band.description} />
          <meta itemProp='image' content={staticLink(conf.images.profile)} />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
          <link rel='stylesheet' href={conf.theme.funFontUrl} />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Questrial&display=swap' />
          <link rel='icon' type='image/png' href={conf.images.favicon} />
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

