import styles from './NavMenu.module.scss'
import NavMenuCategory from '@/components/navmenu/category/NavMenuCategory'
import NavMenuItem from '@/components/navmenu/item/NavMenuItem'

export default function NavMenu (props: any) {
    const spirits = ['Bourbon', 'Brandy', 'Gin', 'Rum', 'Scotch', 'Tequila', 'Vermouth', 'Vodka', 'Whiskey']
    const { navMenuOpen } = props

    return (
        <nav className={[styles.navmenu, (navMenuOpen ?  styles.open : styles.closed)].join(' ')}>
            <ul>
                <NavMenuItem item='Select Ingredients' />
                <NavMenuCategory category='Spirits' items={spirits} />
            </ul>
        </nav>
    )
}