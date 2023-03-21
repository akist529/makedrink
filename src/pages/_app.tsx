import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '@/components/navbar/NavBar'
import NavMenu from '@/components/navmenu/NavMenu'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [navMenuOpen, setNavMenuOpen] = useState(false)
  
  return (
    <div>
      <NavBar
        navMenuOpen={navMenuOpen}
        setNavMenuOpen={setNavMenuOpen}
      />
      <NavMenu
        navMenuOpen={navMenuOpen}
        setNavMenuOpen={setNavMenuOpen}
      />
      <Component {...pageProps} />
    </div>
  )
}
