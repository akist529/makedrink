// Component styles
import styles from './NavBar.module.scss'
// Redux components
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
// Local components
import BurgerButton from '@/components/buttons/BurgerButton/BurgerButton'
import SearchButton from '@/components/buttons/SearchButton/SearchButton'
import SearchInput from '@/components/inputs/SearchInput/SearchInput'

export default function NavBar() {
    // Redux selectors
    const { searchOpen } = useSelector((state: RootState) => state.search)

    return (
        <nav className={styles.navbar}>
            <BurgerButton />
            {!searchOpen && 
                <h1>
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