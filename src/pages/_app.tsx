// Global styles
import '@/styles/globals.css'
// Next components
import type { AppProps } from 'next/app'
// Redux components
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/store/store'
// Local components
import IngredientModal from '@/components/ui/IngredientModal/IngredientModal'
import NavBar from '@/components/navbar/NavBar'
import NavMenu from '@/components/navmenu/NavMenu'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <IngredientModal />
          <NavBar />
          <NavMenu />
          <Component {...pageProps} className="page" />
        </div>
      </PersistGate>
    </Provider>
  )
}