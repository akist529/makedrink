import BurgerButton from '@/components/buttons/BurgerButton/BurgerButton'
import styles from './NavBar.module.scss'

export default function NavBar() {
    return (
        <nav className={styles.navbar}>
            <BurgerButton />
            <h1>BAR.HOME</h1>
        </nav>
    )
}