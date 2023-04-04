import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import IngredientModal from '@/components/ui/IngredientModal/IngredientModal'
import NavBar from '@/components/navbar/NavBar'
import NavMenu from '@/components/navmenu/NavMenu'
import { useState } from 'react'
import store from '@/store/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  const [navMenuOpen, setNavMenuOpen] = useState(false)
  const [ingredientModalOpen, setIngredientModalOpen] = useState(false)

  return (
    <Provider store={store}>
      <div className="app">
        { ingredientModalOpen && <IngredientModal /> }
        <NavBar
          navMenuOpen={navMenuOpen}
          setNavMenuOpen={setNavMenuOpen}
        />
        <NavMenu
          navMenuOpen={navMenuOpen}
          setNavMenuOpen={setNavMenuOpen}
        />
        <Component {...pageProps} className="page" />
      </div>
    </Provider>
  )
}