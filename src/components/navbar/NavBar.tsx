// Component styles
import styles from './NavBar.module.scss';
// React components
import { useEffect, useState, useCallback, useMemo } from 'react';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { openNavMenu, closeNavMenu } from '@/store/slices/navMenu.slice';
import { toggleSearch, closeSearch } from '@/store/slices/search.slice';
// Local components
import BurgerButton from '@/components/buttons/BurgerButton/BurgerButton';
import SearchButton from '@/components/buttons/SearchButton/SearchButton';
import SearchInput from '@/components/search/SearchInput/SearchInput';
import DesktopNavMenu from '@/components/navmenu/desktop/DesktopNavMenu';
import SearchBar from '../search/SearchBar/SearchBar';
import SearchFeed from '../search/SearchFeed/SearchFeed';
// Next components
import Link from 'next/link';

export default function NavBar() {
    // Redux store state
    const searchOpen = useSelector((state: RootState) => state.search.open);
    const dispatch = useDispatch();

    // React local state
    const [displayMode, setDisplayMode] = useState('');
    const arrOfLetters = useMemo(() => 'MAKEDRINK'.split(''), []);
    const resizeWindow = useCallback(() => {
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

        dispatch(closeSearch());
    }, [dispatch]);

    useEffect(() => {
        window.addEventListener('resize', resizeWindow);
        resizeWindow();
    }, [dispatch, resizeWindow]);

    useEffect(() => {
        if (displayMode === 'mobile') {
            dispatch(closeNavMenu());
        }
    }, [searchOpen, dispatch, displayMode]);

    return (
        <nav className={styles.NavBar}>
            { displayMode === 'mobile' && <BurgerButton /> }
            { displayMode === 'mobile' && !searchOpen && 
                <Link href='/'>
                    <h1>
                        {arrOfLetters.map((letter: string, index: number) => {
                            return (
                                <span key={index}>{letter}</span>
                            );
                        })}
                    </h1>
                </Link> }
            { displayMode !== 'mobile' && 
                <Link href='/'>
                    <h1>
                        {arrOfLetters.map((letter: string, index: number) => {
                            return (
                                <span key={index}>{letter}</span>
                            );
                        })}
                    </h1>
                </Link> }
            { displayMode === 'laptop' && <DesktopNavMenu /> }
            { displayMode === 'mobile' && !searchOpen && 
                <SearchButton 
                    clickEvent={() => dispatch(toggleSearch())} 
                    style={{ filter: 'invert(1' }} /> }
            { displayMode === 'mobile' && searchOpen && 
                <SearchInput /> }
            { displayMode !== 'mobile' && <SearchBar /> }
            { searchOpen && <SearchFeed /> }
        </nav>
    );
}