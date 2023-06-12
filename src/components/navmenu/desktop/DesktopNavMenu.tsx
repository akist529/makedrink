// Component styles
import styles from './DesktopNavMenu.module.scss';
// Next components
import Link from 'next/link';
// Local components
import NavMenuItem from '@/components/navmenu/item/NavMenuItem';

export default function DesktopNavMenu () {
    return (
        <nav className={styles.NavMenu}>
            <ul>
                <Link href='/'>
                    <NavMenuItem 
                        item='Make A Drink' 
                        img='liquor.svg' />
                </Link>
                <Link href='/ingredients'>
                    <NavMenuItem 
                        item='Select Ingredients' 
                        img='blender.svg' />
                </Link>
                <Link href='/drinks?page=0'>
                    <NavMenuItem 
                        item='All Drinks' 
                        img='local_bar.svg' />
                </Link>
                <Link href='/drinks/possible?page=0'>
                    <NavMenuItem 
                        item='Possible Drinks' 
                        img='done_all.svg' />
                </Link>
                <Link href='/drinks/filtered?page=0'>
                    <NavMenuItem 
                        item='Filtered Drinks' 
                        img='filter_list.svg' />
                </Link>
                <Link href='/drinks/favorited?page=0'>
                    <NavMenuItem 
                        item='Favorite Drinks' 
                        img='favorite.svg' />
                </Link>
                <Link href='/drinks/blocked?page=0'>
                    <NavMenuItem 
                        item='Blocked Drinks' 
                        img='block.svg' />
                </Link>
            </ul>
        </nav>
    );
}