// Component styles
import styles from './MobileNavMenu.module.scss';
// React components
import { useEffect } from 'react';
// Next components
import Link from 'next/link';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleNavMenu } from '@/store/slices/navMenu.slice';
// Local components
import NavMenuItem from '@/components/navmenu/item/NavMenuItem';

export default function MobileNavMenu () {
    // Redux selectors
    const { navMenuOpen } = useSelector((state: RootState) => state.navMenu);
    const dispatch = useDispatch();

    const navStyles = [styles.NavMenu, (navMenuOpen ?  styles.open : styles.closed)].join(' ');

    function handleClick () {
        if (window.innerWidth < 600) {
            dispatch(toggleNavMenu());
        }
    }

    return (
        <nav className={navStyles}>
            <ul>
                <Link href='/' onClick={handleClick}>
                    <NavMenuItem 
                        item='Make A Drink' 
                        slug='/' 
                        img='liquor.svg' />
                </Link>
                <Link href='/ingredients' onClick={handleClick}>
                    <NavMenuItem 
                        item='Select Ingredients' 
                        slug='/ingredients' 
                        img='blender.svg' />
                </Link>
                <Link href='/drinks' onClick={handleClick}>
                    <NavMenuItem 
                        item='All Drinks' 
                        slug='/drinks' 
                        img='local_bar.svg' />
                </Link>
                <Link href='/drinks/possible' onClick={handleClick}>
                    <NavMenuItem 
                        item='Possible Drinks' 
                        slug='/drinks/possible' 
                        img='done_all.svg' />
                </Link>
                <Link href='/drinks/filtered' onClick={handleClick}>
                    <NavMenuItem 
                        item='Filtered Drinks' 
                        slug='/drinks/filtered' 
                        img='filter_list.svg' />
                </Link>
                <Link href='/drinks/favorited' onClick={handleClick}>
                    <NavMenuItem 
                        item='Favorite Drinks' 
                        slug='/drinks/favorited' 
                        img='favorite.svg' />
                </Link>
                <Link href='/drinks/blocked' onClick={handleClick}>
                    <NavMenuItem 
                        item='Blocked Drinks' 
                        slug='/drinks/blocked' 
                        img='block.svg' />
                </Link>
            </ul>
        </nav>
    );
}