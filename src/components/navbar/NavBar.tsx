// Component styles
import styles from './NavBar.module.scss';
// React components
import { useEffect, useState } from 'react';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { openNavMenu, closeNavMenu } from '@/store/slices/navMenu.slice';
import { closeSearch } from '@/store/slices/search.slice';
// Local components
import BurgerButton from '@/components/buttons/BurgerButton/BurgerButton';
import SearchButton from '@/components/buttons/SearchButton/SearchButton';
import SearchInput from '@/components/inputs/SearchInput/SearchInput';
import DesktopNavMenu from '@/components/navmenu/desktop/DesktopNavMenu';
import SearchBar from '../searchbar/SearchBar';
// Next components
import Link from 'next/link';

export default function NavBar() {
    const { searchOpen } = useSelector((state: RootState) => state.search);
    const arrOfLetters = 'MAKEDRINK'.split('');
    const [displayMode, setDisplayMode] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth < 600) {
                setDisplayMode('mobile');
                dispatch(closeNavMenu());
                dispatch(closeSearch());
            } else if (window.innerWidth < 992) {
                setDisplayMode('tablet');
                dispatch(openNavMenu());
                dispatch(closeSearch());
            } else {
                setDisplayMode('laptop');
                dispatch(closeNavMenu());
                dispatch(closeSearch());
            }
        }

        window.addEventListener('resize', onResize);
    }, [dispatch]);

    useEffect(() => {
        if (window.innerWidth < 600) {
            setDisplayMode('mobile');
            dispatch(closeNavMenu());
            dispatch(closeSearch());
        } else if (window.innerWidth < 992) {
            setDisplayMode('tablet');
            dispatch(openNavMenu());
            dispatch(closeSearch());
        } else {
            setDisplayMode('laptop');
            dispatch(closeNavMenu());
            dispatch(closeSearch());
        }
    }, []);

    return (
        <nav className={styles.NavBar}>
            { displayMode === 'mobile' && 
                <BurgerButton /> }
            { displayMode === 'mobile' && 
                !searchOpen && 
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
            { displayMode === 'laptop' && 
                <DesktopNavMenu /> }
            { displayMode === 'mobile' && 
                !searchOpen && 
                <SearchButton /> }
            { displayMode === 'mobile' && 
                searchOpen && 
                <SearchInput /> }
            { displayMode !== 'mobile' && 
                <SearchBar /> }
        </nav>
    );
}