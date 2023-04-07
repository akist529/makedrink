import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import IngredientModal from '@/components/ui/IngredientModal/IngredientModal'
import NavBar from '@/components/navbar/NavBar'
import NavMenu from '@/components/navmenu/NavMenu'
import { Provider } from 'react-redux'
import { persistor, store } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'

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