// Component styles
import styles from './NavMenu.module.scss';
// Next components
import Link from 'next/link';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleNavMenu } from '@/store/slices/navMenu.slice';
// Local components
import NavMenuCategory from '@/components/navmenu/category/NavMenuCategory';
import NavMenuItem from '@/components/navmenu/item/NavMenuItem';

export default function NavMenu () {
    // Redux selectors
    const { navMenuOpen } = useSelector((state: RootState) => state.navMenu);
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const dispatch = useDispatch();

    const navStyles = [styles.NavMenu, (navMenuOpen ?  styles.open : styles.closed)].join(' ');

    return (
        <nav className={navStyles}>
            <ul>
                <Link href='/' onClick={() => dispatch(toggleNavMenu())}>
                    <NavMenuItem 
                        item='Make A Drink' 
                        img='liquor.svg' />
                </Link>
                <Link href='/ingredients' onClick={() => dispatch(toggleNavMenu())}>
                    <NavMenuItem 
                        item='Select Ingredients' 
                        img='blender.svg' />
                </Link>
                <Link href='/drinks' onClick={() => dispatch(toggleNavMenu())}>
                    <NavMenuItem 
                        item='All Drinks' 
                        img='local_bar.svg' />
                </Link>
                <Link href='/drinks/possible' onClick={() => dispatch(toggleNavMenu())}>
                    <NavMenuItem 
                        item='Possible Drinks' 
                        img='done_all.svg' />
                </Link>
                <Link href='/drinks/filtered' onClick={() => dispatch(toggleNavMenu())}>
                    <NavMenuItem 
                        item='Filtered Drinks' 
                        img='filter_list.svg' />
                </Link>
                <Link href='/drinks/favorited' onClick={() => dispatch(toggleNavMenu())}>
                    <NavMenuItem 
                        item='Favorite Drinks' 
                        img='favorite.svg' />
                </Link>
                <Link href='/drinks/blocked' onClick={() => dispatch(toggleNavMenu())}>
                    <NavMenuItem 
                        item='Blocked Drinks' 
                        img='block.svg' />
                </Link>
            </ul>
        </nav>
    );
}