import styles from './NavMenu.module.scss'
import NavMenuCategory from '@/components/navmenu/category/NavMenuCategory'
import NavMenuItem from '@/components/navmenu/item/NavMenuItem'
import Link from 'next/link'

export default function NavMenu (props: {navMenuOpen: boolean, setNavMenuOpen: Function}) {
    const spirits = ['Whiskey', 'Brandy', 'Gin', 'Rum', 'Scotch', 'Tequila', 'Vermouth', 'Vodka', 'Absinthe']
    const { navMenuOpen, setNavMenuOpen } = props

    return (
        <nav className={[styles.navmenu, (navMenuOpen ?  styles.open : styles.closed)].join(' ')}>
            <ul>
                <Link href='/ingredients' onClick={() => setNavMenuOpen((prevState: boolean) => !prevState)}>
                    <NavMenuItem item='Select Ingredients' />
                </Link>
                <NavMenuCategory category='Spirits' items={spirits} />
            </ul>
        </nav>
    )
}