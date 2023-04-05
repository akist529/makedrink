import { Html, Head, Main, NextScript } from 'next/document'
import { Provider } from 'react-redux'
import store from '@/store/store'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Provider store={store}>
        <body>
          <Main />
          <NextScript />
        </body>
      </Provider>
    </Html>
  )
}
