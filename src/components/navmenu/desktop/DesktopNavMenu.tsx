// Component styles
import styles from './DesktopNavMenu.module.scss';
// Local components
import NavMenuItem from '@/components/navmenu/item/NavMenuItem';

export default function DesktopNavMenu () {
    return (
        <nav className={styles.NavMenu}>
            <ul>
                <NavMenuItem 
                    item='Make A Drink' 
                    img='liquor.svg' 
                    link='/' />
                <NavMenuItem 
                    item='Select Ingredients' 
                    img='blender.svg' 
                    link='/ingredients' />
                <NavMenuItem 
                    item='All Drinks' 
                    img='local_bar.svg' 
                    link='/drinks?page=0' />
                <NavMenuItem 
                    item='Possible Drinks' 
                    img='done_all.svg' 
                    link='/drinks/possible?page=0' />
                <NavMenuItem 
                    item='Filtered Drinks' 
                    img='filter_list.svg' 
                    link='/drinks/filtered?page=0' />
                <NavMenuItem 
                    item='Favorite Drinks' 
                    img='favorite.svg' 
                    link='/drinks/favorited?page=0' />
                <NavMenuItem 
                    item='Blocked Drinks' 
                    img='block.svg' 
                    link='/drinks/blocked?page=0' />
            </ul>
        </nav>
    );
}