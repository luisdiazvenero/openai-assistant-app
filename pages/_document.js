// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'
import { themeConfig } from '../config/theme'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href={themeConfig.font.url}
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}