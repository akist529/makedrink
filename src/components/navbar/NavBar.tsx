// Component styles
import styles from './NavBar.module.scss'
// Redux components
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
// Local components
import BurgerButton from '@/components/buttons/BurgerButton/BurgerButton'
import SearchButton from '@/components/buttons/SearchButton/SearchButton'
import SearchInput from '@/components/inputs/SearchInput/SearchInput'
// Next components
import Link from 'next/link'

export default function NavBar() {
    // Redux selectors
    const { searchOpen } = useSelector((state: RootState) => state.search)

    return (
        <nav className={styles.navbar}>
            <BurgerButton />
            {!searchOpen && 
                <Link href='/'>
                    <h1>
                        {('BAR.HOME'.split('')).map((letter, index) => {
                            return (
                                <span key={index}>{letter}</span>
                            )
                        })}
                    </h1>
                </Link>}
            {!searchOpen && <SearchButton />}
            {searchOpen && <SearchInput />}
        </nav>
    )
}