// Component styles
import styles from './NavBar.module.scss';
// React components
import { useEffect, useState } from 'react';
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
    const [showMobileNav, setShowMobileNav] = useState(true);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) {
                setShowMobileNav(false);
            } else {
                setShowMobileNav(true);
            }
        }

        window.addEventListener('resize', onResize);
    }, []);

    return (
        <nav className={styles.NavBar}>
            { showMobileNav && <BurgerButton /> }
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
            { showMobileNav && !searchOpen && <SearchButton /> }
            { showMobileNav && searchOpen && <SearchInput /> }
        </nav>
    );
}