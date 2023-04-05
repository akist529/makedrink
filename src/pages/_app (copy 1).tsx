import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import IngredientModal from '@/components/ui/IngredientModal/IngredientModal'
import NavBar from '@/components/navbar/NavBar'
import NavMenu from '@/components/navmenu/NavMenu'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  const { ingredientModalOpen } = useSelector((state: RootState) => state.ingredientModal)

  return (
    <div className="app">
      { ingredientModalOpen && <IngredientModal /> }
      <NavBar />
      <NavMenu />
      <Component {...pageProps} className="page" />
    </div>
  )
}