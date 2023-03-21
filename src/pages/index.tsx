import styles from '@/styles/Home.module.css'
import NavBar from '@/components/navbar/NavBar'
import NavMenu from '@/components/navmenu/NavMenu'
import { useState } from 'react'

export default function HomePage() {
  const [navMenuOpen, setNavMenuOpen] = useState(false)

  return (
    <div>
      <NavBar
        navMenuOpen={navMenuOpen}
        setNavMenuOpen={setNavMenuOpen}
      />
      <NavMenu navMenuOpen={navMenuOpen} />
      <div>Welcome to Next.js!</div>
      <footer>
        <a href="https://www.flaticon.com/free-icons" title="spirit icons">Spirit icons created by Freepik - Flaticon</a>
      </footer>
    </div>
  )
}
