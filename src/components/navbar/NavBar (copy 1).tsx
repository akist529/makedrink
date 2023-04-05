import BurgerButton from '@/components/buttons/BurgerButton/BurgerButton'
import SearchButton from '@/components/buttons/SearchButton/SearchButton'
import SearchInput from '@/components/inputs/SearchInput/SearchInput'
import styles from './NavBar.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export default function NavBar() {
    const { searchOpen } = useSelector((state: RootState) => state.search)

    return (
        <nav className={styles.navbar}>
            <BurgerButton />
            {!searchOpen && <h1>
                {('BAR.HOME'.split('')).map((letter, index) => {
                    return (
                        <span key={index}>{letter}</span>
                    )
                })}
            </h1>}
            {!searchOpen && <SearchButton />}
            {searchOpen && <SearchInput />}
        </nav>
    )
}