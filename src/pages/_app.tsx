import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import IngredientModal from '@/components/ui/IngredientModal/IngredientModal'
import NavBar from '@/components/navbar/NavBar'
import NavMenu from '@/components/navmenu/NavMenu'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [navMenuOpen, setNavMenuOpen] = useState(false)
  const [ingredientModalOpen, setIngredientModalOpen] = useState(false)
  
  return (
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
  )
}
