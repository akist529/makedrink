// Component styles
import styles from './NavBar.module.scss';
// Redux components
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
// Local components
import BurgerButton from '@/components/buttons/BurgerButton/BurgerButton';
import SearchButton from '@/components/buttons/SearchButton/SearchButton';
import SearchInput from '@/components/inputs/SearchInput/SearchInput';
// Next components
import Link from 'next/link';

export default function NavBar() {
    const { searchOpen } = useSelector((state: RootState) => state.search);
    const arrOfLetters = 'BAR.HOME'.split('');

    return (
        <nav className={styles.NavBar}>
            <BurgerButton />
            { !searchOpen && 
                <Link href='/'>
                    <h1>
                        {arrOfLetters.map((letter: string, index: number) => {
                            return (
                                <span key={index}>{letter}</span>
                            )
                        })}
                    </h1>
                </Link> }
            { !searchOpen && <SearchButton /> }
            { searchOpen && <SearchInput /> }
        </nav>
    );
}