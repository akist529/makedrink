import BurgerButton from '@/components/buttons/BurgerButton/BurgerButton'
import SearchButton from '@/components/buttons/SearchButton/SearchButton'
import SearchInput from '@/components/inputs/SearchInput/SearchInput'
import styles from './NavBar.module.scss'
import { useState } from 'react'

export default function NavBar(props: any) {
    const { navMenuOpen, setNavMenuOpen } = props
    const [searchOpen, setSearchOpen] = useState(false)

    return (
        <nav className={styles.navbar}>
            <BurgerButton navMenuOpen={navMenuOpen} setNavMenuOpen={setNavMenuOpen} />
            {!searchOpen && <h1>
                {('BAR.HOME'.split('')).map(letter => {
                    return (
                        <span key={letter}>{letter}</span>
                    )
                })}
            </h1>}
            {!searchOpen && <SearchButton setSearchOpen={setSearchOpen} />}
            {searchOpen && <SearchInput setSearchOpen={setSearchOpen} />}
        </nav>
    )
}