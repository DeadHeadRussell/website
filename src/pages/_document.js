import {ServerStyleSheets} from '@material-ui/core/styles';
import Document, {Head, Main, NextScript} from 'next/document';

import {theme} from '../theme';

export default class RootDocument extends Document {
  render() {
    return (
      <html lang='en'>
        <Head>
          <meta name='theme-color' content={theme.palette.primary.main} />
          <meta itemProp='name' content='Andrew Russell' />
          <meta itemProp='description' content="Andrew Russell's musical website" />
          <meta itemProp='image' content='/profile.jpg' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
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

