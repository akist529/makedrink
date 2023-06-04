// Component styles
import styles from './NavBar.module.scss';
// React components
import { useEffect, useState } from 'react';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { openNavMenu, closeNavMenu } from '@/store/slices/navMenu.slice';
// Local components
import BurgerButton from '@/components/buttons/BurgerButton/BurgerButton';
import SearchButton from '@/components/buttons/SearchButton/SearchButton';
import SearchInput from '@/components/inputs/SearchInput/SearchInput';
import DesktopNavMenu from '@/components/navmenu/desktop/DesktopNavMenu';
// Next components
import Link from 'next/link';

export default function NavBar() {
    const { searchOpen } = useSelector((state: RootState) => state.search);
    const arrOfLetters = 'BAR.HOME'.split('');
    const [displayMode, setDisplayMode] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth < 600) {
                setDisplayMode('mobile');
                dispatch(closeNavMenu());
            } else if (window.innerWidth < 992) {
                setDisplayMode('tablet');
                dispatch(openNavMenu());
            } else {
                setDisplayMode('laptop');
                dispatch(closeNavMenu());
            }
        }

        window.addEventListener('resize', onResize);
    }, [dispatch]);

    return (
        <nav className={styles.NavBar}>
            { displayMode === 'mobile' && <BurgerButton /> }
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
            { displayMode === 'laptop' && 
                <DesktopNavMenu /> }
            { !searchOpen && <SearchButton /> }
            { searchOpen && <SearchInput /> }
        </nav>
    );
}