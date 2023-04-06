import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import IngredientModal from '@/components/ui/IngredientModal/IngredientModal'
import NavBar from '@/components/navbar/NavBar'
import NavMenu from '@/components/navmenu/NavMenu'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="app">
        <IngredientModal />
        <NavBar />
        <NavMenu />
        <Component {...pageProps} className="page" />
      </div>
    </Provider>
  )
}