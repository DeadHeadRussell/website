import React from 'react';

const gaString = {
  __html: `
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-22276754-1']);
    _gaq.push(['_trackPageview']);

    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        document.head.appendChild(ga);
    })();
  `
};

export default function Root({title, jsPath, cssPath, children}) {
  return (
    <html itemScope itemType='http://schema.org/Person'>
      <head>
        <title>{title || 'Andrew Russell'}</title>

        <meta itemProp='name' content='Andrew Russell' />
        <meta itemProp='description' content="Andrew Russell's musical website" />
        <meta itemProp='image' content='http://ajrussell.ca/img/main.png' />

        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
        <link rel='stylesheet' href={cssPath} />
      </head>

      <body>
        <div id='root'>{children}</div>
        <script src={jsPath}></script>
        <script dangerouslySetInnerHTML={gaString}></script>
      </body>
    </html>
  );
}

