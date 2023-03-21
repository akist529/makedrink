import BurgerButton from '@/components/buttons/BurgerButton/BurgerButton'
import SearchButton from '@/components/buttons/SearchButton/SearchButton'
import styles from './NavBar.module.scss'

export default function NavBar(props: any) {
    const { navMenuOpen, setNavMenuOpen } = props

    return (
        <nav className={styles.navbar}>
            <BurgerButton navMenuOpen={navMenuOpen} setNavMenuOpen={setNavMenuOpen} />
            <h1>BAR.HOME</h1>
            <SearchButton />
        </nav>
    )
}